// Generouted, changes to this file will be overridden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/app`
  | `/login`
  | `/login/login-form`
  | `/login/mahasiswa`
  | `/login/onboarding`
  | `/login/sso`
  | `/main`
  | `/maxlearn`
  | `/state`
  | `/station`

export type Params = {
  
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
