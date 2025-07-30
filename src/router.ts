// Generouted, changes to this file will be overridden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/app`
  | `/login`
  | `/login/YesMaba`
  | `/login/login-form`
  | `/login/register-form`
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
