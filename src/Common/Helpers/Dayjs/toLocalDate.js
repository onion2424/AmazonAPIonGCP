// dayjs拡張
export const toLocalDate = (option, dayjsClass) => {
  dayjsClass.prototype.toLocalDate = function () {
    return new Date(this.valueOf() + this.utcOffset() * 60 * 1000);
  }
}