/*
** 时间戳转换成指定格式日期
** eg. 
** dateFormat(11111111111111, 'y年M月d日 h时m分s秒')
** → "2322年02月06日 03时45分"
*/
export const dateFormat = function (timestamp, formats = 'y-M-d') {
  // formats格式包括
  // 1. y-M-d
  // 2. y-M-d h:M:s
  // 3. y年M月d日
  // 4. y年M月d日 h时m分
  let zero = function (value) {
      if (value < 10) {
          return '0' + value;
      }
      return value;
  };
  let myDate = timestamp? new Date(timestamp): new Date();

  let year = myDate.getFullYear();
  let month = zero(myDate.getMonth() + 1);
  let day = zero(myDate.getDate());

  let hour = zero(myDate.getHours());
  let minite = zero(myDate.getMinutes());
  let second = zero(myDate.getSeconds());

  return formats.replace(/Y|M|d|H|m|s/ig, function (matches) {
      return ({
          Y: year,
          y: year,
          M: month,
          D: day,
          d: day,
          H: hour,
          h: hour,
          m: minite,
          S: second,
          s: second
      })[matches];
  });
};