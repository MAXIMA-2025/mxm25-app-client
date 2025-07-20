import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";

interface ConfirmDialogOptions<T> {
  newRow: T | null;
  oldRow: T | null;
  computeMutation: (newRow: T | null, oldRow: T | null) => string | null;
  onConfirm: (newRow: T | null) => Promise<void>;
}

export const useConfirm = <T extends object>() => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmDialogOptions<T> | null>(null);

  const promiseRef = useRef<{
    resolve: (value: T | null | PromiseLike<T | null>) => void;
    reject: (reason?: any) => void;
  } | null>(null);

  const requestConfirmation = (
    opts: ConfirmDialogOptions<T>
  ): Promise<T | null> => {
    return new Promise((resolve, reject) => {
      setOptions(opts);
      promiseRef.current = { resolve, reject };
      setOpen(true);
    });
  };

  const handleClose = () => {
    setOpen(false);
    setOptions(null);
    promiseRef.current = null;
  };

  const handleYes = async () => {
    if (!options || !promiseRef.current) return;

    try {
      await options.onConfirm(options.newRow);
      promiseRef.current.resolve(options.newRow);
    } catch (error) {
      promiseRef.current.reject(error);
    } finally {
      handleClose();
    }
  };

  const handleNo = () => {
    if (promiseRef.current) {
      promiseRef.current.resolve(options?.oldRow ?? null);
    }
    handleClose();
  };

  const ConfirmDialog = () => {
    if (!open || !options) return null;

    const mutationText = options.computeMutation(
      options.newRow,
      options.oldRow
    );

    return (
      <Dialog open={open} onClose={handleNo} maxWidth="xs" fullWidth>
        <DialogTitle>Konfirmasi Perubahan</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2">
            {mutationText
              ? `Apakah Anda yakin ingin melanjutkan aksi berikut: ${mutationText}`
              : "Tidak ada perubahan yang terdeteksi."}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNo} color="inherit">
            Tidak
          </Button>
          <Button
            onClick={handleYes}
            variant="contained"
            color="primary"
            autoFocus
          >
            Ya
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return { ConfirmDialog, requestConfirmation };
};
