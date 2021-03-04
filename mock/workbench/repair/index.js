import Mock from "mockjs";
// import { getParams } from "@/utils/url";

/*
@name          remind
@desc          报修单催办
@params        id       string      报修单id
@return        status   string
*/
Mock.mock(
  new RegExp("/api/v1/operations/workbench/repair/remind"),
  "post",
  Mock.res({ status: "success" })
);

/*
@name           operate
@desc           报修单操作[操作、完结、撤回]
@params         {
                    id          string      报修单id
                    operate     string      操作{终止: 'Terminate', 完结: 'End', 撤回: 'Withdraw'}
                }
@return         status  string
*/
Mock.mock(
  new RegExp("/api/v1/operations/workbench/repair/operate"),
  "post",
  Mock.res({ status: "success" })
);
