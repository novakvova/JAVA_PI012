import { useEffect } from "react";

const GoogleAuth = () => {

    const handleGoogleLogin = (resp: any) => {
        console.log("Google resp", resp);
        const token = resp.credential;
        console.log("Token auth", token);
        
    }

    useEffect(() => {
        //global google
        window.google.accounts!.id.initialize({
          client_id: "1054645870882-h5tapu9minrlm1b6bf8p28s24d789007.apps.googleusercontent.com",
          callback: handleGoogleLogin
        });
    
        window.google.accounts!.id.renderButton(document.getElementById("signInDiv"),{
          theme: "outline", size: "small"
        });
    
      }, []);

    return (
        <>
            <div id="signInDiv"></div>
        </>
    );
}
export default GoogleAuth;