import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {Link} from "react-router-dom";
import React from "react";
import {useLoginPage} from "../../libs/FormCmsAdminSdk";

// Import a GitHub logo (you'll need to add this to your project assets)
import githubLogo from '../../assets/github-logo.png'; // Ensure you have a GitHub logo image in your project

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

// Style for the GitHub button to match PrimeReact aesthetic
const githubButtonStyle: React.CSSProperties = {
    backgroundColor: '#24292e', // GitHub's dark color
    color: '#ffffff',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px', // Space between icon and text
};

// Style for the GitHub logo
const githubIconStyle: React.CSSProperties = {
    width: '20px',
    height: '20px',
};

export function LoginPage({baseRouter}: { baseRouter: string }) {
    const langTexts = languageConfig['en'];
    const {error, email, setEmail, password, setPassword, handleLogin, handleGitHubLogin, registerLink} = useLoginPage(baseRouter);

    return (
        <div style={containerStyle}>
            <Card title={langTexts.login} className="p-shadow-5" style={{width: '350px'}}>
                <div className="p-fluid">
                    {error && (
                        <div className="p-field">
                            <span className="p-error">{error}</span>
                        </div>
                    )}
                    <div className="p-field">
                        <label htmlFor="email">{langTexts.email}</label>
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
                        <Button label={'Login with GitHub'} onClick={handleGitHubLogin}>
                        <img
                            src={githubLogo}
                            alt="GitHub Logo"
                            style={githubIconStyle}
                            className="p-mr-2"
                        />
                        </Button>
                       <Button
                            size={'small'}
                            outlined
                            label={langTexts.demoCredentials}
                            onClick={() => {
                                setEmail('admin@cms.com');
                                setPassword('Admin1!');
                            }}
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
}