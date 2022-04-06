import axios from "axios"




function checkAuth(nav,setAuthenticated){
    const atoken =  localStorage.getItem("atoken");
        const rtoken = localStorage.getItem("rtoken")
        if(atoken){
            axios.get(process.env.REACT_APP_BACKEND_API+"/token",{headers : {"authorization" : `Bearer ${atoken}`},crossdomain:true}).then((res)=>{
                if(res.data.msg!=="hola"){
                    if(rtoken){
                        axios.get(process.env.REACT_APP_BACKEND_API+"/checkToken",{headers:{"authorization":`Bearer ${rtoken}`,crossdomain:true}}).then((res)=>{
                            localStorage.setItem("atoken",res.data.atoken);
                            console.log("Stored again");
                            if(setAuthenticated){
                                setAuthenticated(true);
                            }
                            
                        });
                    }else{
                       //nav("/login");
                       console.log("Go to login");
                       if(setAuthenticated){
                            setAuthenticated(false)
                       }else{
                           nav("/")
                       }
                       
                    }
                }else{
                    console.log(res.data.user);
                    if(setAuthenticated){
                        setAuthenticated(true)
                    }
                }
            })
        }else{
           //nav("/login");
           console.log("Go to login");
           if(setAuthenticated){
           setAuthenticated(false)
           }else{
               nav("/");
           }
        }
}

function logout(nav,setAuthenticated){
    const rtoken =  localStorage.getItem("rtoken");
    localStorage.clear();
    axios.get(process.env.REACT_APP_BACKEND_API+"/logout",{headers :{"authorization" : `Bearer ${rtoken}`}}).then((res)=>{
        console.log("Logged out");
        setAuthenticated(false)
        nav("/",{replace:true});

    })
    
}


export {checkAuth,logout};