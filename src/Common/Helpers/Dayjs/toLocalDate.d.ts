import inst, { PluginFunc, UnitType } from 'dayjs'

import { PluginFunc, ConfigType } from 'dayjs'

declare const plugin: PluginFunc
export = plugin

declare module 'dayjs' {
  interface Dayjs {
    /**
     * タイムゾーンでの時間を反映したDateを返します。
     */
    toLocalDate(): Date
  }

  export function toLocalDate(): Date
}