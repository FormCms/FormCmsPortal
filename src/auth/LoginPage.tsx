import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {Link} from "react-router-dom";
import React from "react";
import {useLoginPage} from "../../libs/FormCmsAdminSdk";

const languageConfig = {
    en: {
        login: "Login",
        email: "Email",
        password: "Password",
        registerPrompt: "Don't have an account? Register",
        demoCredentials: "Use demo user and password"
    },
};

const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
};

export function LoginPage({baseRouter}: { baseRouter: string }) {
    const langTexts = languageConfig['en'];
    const {error, email, setEmail, password, setPassword, handleLogin, registerLink} = useLoginPage(baseRouter);

    return (
        <div style={containerStyle}>
            <Card title={langTexts.login} className="p-shadow-5" style={{width: '300px'}}>
                <div className="p-fluid">
                    {error && (
                        <div className="p-field">
                            <span className="p-error">{error}</span>
                        </div>
                    )}
                    <div className="p-field">
                        <label htmlFor="mail">{langTexts.email}</label>
                        <InputText
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="p-field"></div>
                    <div className="p-field">
                        <label htmlFor="password">{langTexts.password}</label>
                        <Password
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            feedback={false}
                            toggleMask
                        />
                    </div>
                    <div className="p-field"></div>
                    <Button
                        label={langTexts.login}
                        icon="pi pi-check"
                        onClick={handleLogin}
                        className="p-mt-2"
                    />
                    <div className="p-field"></div>
                    <div className="p-mt-3">
                        <Link to={registerLink}>{langTexts.registerPrompt}</Link>
                    </div>
                    <br/>
                    <div className="p-mt-3">
                        <Button size={'small'} outlined label={langTexts.demoCredentials} onClick={
                            () => {
                                setEmail('admin@cms.com');
                                setPassword('Admin1!');
                            }
                        }></Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}