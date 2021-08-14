import React, { createContext, useContext, useState } from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';

import Login from './pages/Login';
/* import Cadastro from './pages/Cadastro'; */
import Restaurantes from './pages/Restaurantes'

export const AuthContext = createContext();

function RotasProtegidas(props) {
    const { token } = useContext(AuthContext);

    return(
        <Route render={() => (localStorage.getItem('@restaurante/token') ? props.children : <Redirect to='/' />)} />
    )
}

function Routes() {
    const [token, setToken] = useState('');

    function logar(tokenLogar) {
        setToken(tokenLogar);
        
    }

    function deslogar() {
        setToken('');
    }

    return (
        <AuthContext.Provider value={{ token, logar, deslogar }}>
            <Router>
                <Switch>
                    <Route path="/" exact component={Login} />
                    {/* <Route path="/cadastro" component={Cadastro} /> */}
                    <RotasProtegidas>
                        <Route path="/restaurantes" component={Restaurantes}/>
                    </RotasProtegidas>
                </Switch>
            </Router>
        </AuthContext.Provider>
    );
}

export default Routes;