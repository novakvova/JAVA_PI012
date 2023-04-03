import jwtDecode from "jwt-decode";
import { Dispatch } from "react";
import { APP_ENV } from "../../env";
import setAuthToken from "../../helpers/setAuthToken";
import http_common from "../../http_common";
import { AuthUserActionType, IAuthResponse, ILoginPage, IUser } from "./types";

export const LoginUser = async (values: ILoginPage, dispatch: Dispatch<any>) => {
    try {
    const resp = await http_common.post<IAuthResponse>(
        `${APP_ENV.REMOTE_HOST_NAME}account/login`,
        values
      );
      AuthUserToken(resp.data.token, dispatch);
      return Promise.resolve();

    } catch (error: any) {
        return Promise.reject();
        //console.log("Щось пішло не так", error);
    }
}

export const AuthUserToken = (token: string, dispatch: Dispatch<any>) => {
    const user = jwtDecode(token) as IUser;
      dispatch({
        type: AuthUserActionType.LOGIN_USER,
        payload: {email: user.email, image: user.image, phone: user.phone, roles: user.roles} as IUser
      });
      setAuthToken(token);
      localStorage.token = token;
}