// Generouted, changes to this file will be overridden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/challenges`
  | `/challenges/maxlearn`
  | `/challenges/maxlearn/game`
  | `/challenges/maxsnap`
  | `/login`
  | `/login/mahasiswa`
  | `/main`
  | `/maxlearn`
  | `/state`
  | `/station`
  | `/tickets`

export type Params = {
  
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
