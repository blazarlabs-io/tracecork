import {authPages} from './authPages'
import {dashboardGlobalComponents} from './dashboardGlobalComponents'
import {dashboardHome} from './dashboardHome'
import {manageAccount} from './dashboardMyAccount/manageAccount'
import {subscription} from './dashboardMyAccount/subscription'
import {generalSettings} from './dashboardSettings/generalSettings'
import {myWines} from './dashboardWinery/myWines'
import {wineStepper} from './dashboardWinery/myWines/stepper'
import {wineryDetails} from './dashboardWinery/wineryDetails'
import {publicPages} from './pages'
import {publicComponents} from './publicComponents'
import {systemVariables} from './systemVariables'
import {toasts} from './toasts'
import {wineDetails} from './wineDetails'

export const schemaTypes = [
  authPages,
  systemVariables,
  publicPages,
  publicComponents,
  dashboardGlobalComponents,
  dashboardHome,
  wineryDetails,
  myWines,
  wineStepper,
  subscription,
  manageAccount,
  generalSettings,
  wineDetails,
  toasts,
]
