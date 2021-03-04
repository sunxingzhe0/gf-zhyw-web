import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.locale("zh-cn");
dayjs.extend(updateLocale);
dayjs.updateLocale("zh-cn", {
  weekdays: [
    "星期天",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ],
});
