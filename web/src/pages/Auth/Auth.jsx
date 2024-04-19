import React, { useContext, useState } from "react";
import style from "./Auth.module.scss"; 
import Input from "../../ui/Input/Input.jsx";
import Button from "../../ui/Button/Button.jsx";
import { Login } from "../../Api/Api.js";
import { useNavigate } from 'react-router-dom';
import DataContext from "../../context.js";
function Auth() {
    const {setUserData} = useContext(DataContext)
    const [LoginData, setLoginData] = useState("")
    const [passwordData, setpasswordData] = useState("")
    const navigate = useNavigate();


    const handleLogin = () => {
        const data = {
            login: LoginData,
            password: passwordData
          };
        Login(data).then((response) => {
            setUserData(response.data)
            navigate('/HomePage');
        });
      };

    
    // mbuchnev@mail.com
    return(
        <div className={style.Auth}>
             <div className={style.Auth__inner}>
                <div>
                    <h1 className={style.Auth__title}>Авторизация</h1>
                    <Input placeholder="ivanov@gmail.com" type="text" labelText="Эл.почта" setData={setLoginData} defaultValue="mbuchnev@mail.com"/>
                    <Input placeholder="****" type="text" labelText="Пароль" setData={setpasswordData}/>
                    <Button Bg="#F37022" text="Войти" textColot="#fff" w="288px" h="58px" handleLogin={handleLogin} />
                </div>
            </div>
        </div>
    )
  }
  
  export default Auth;
  