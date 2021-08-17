import React, { createContext, useContext, useState } from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';

import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Restaurantes from './pages/Restaurantes'
import Cardapio from './pages/Cardapio';

export const AuthContext = createContext();

function RotasProtegidas(props) {
    const { token } = useContext(AuthContext);
    return(
        <Route render={() => (localStorage.getItem('@usuario/token') ? props.children : <Redirect to='/' />)} />
    )
}

function Routes() {
    const [token, setToken] = useState('');
    const [id, setId] = useState('');

    function idRestaurante(idRes) {
        console.log(`peguei o id: ${idRes}`)
        setId(idRes);
    }

    function logar(tokenLogar) {
        setToken(tokenLogar);
    }

    function deslogar() {
        setToken('');
    }

    return (
        <AuthContext.Provider value={{ token, logar, deslogar, idRestaurante, id }}>
            <Router>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/cadastro" component={Cadastro} />
                    <RotasProtegidas>
                        <Route path="/restaurantes" exact component={Restaurantes}/>
                        <Route path= {`/restaurante/${id}`} exact component={Cardapio}/>
                    </RotasProtegidas>
                </Switch>
            </Router>
        </AuthContext.Provider>
    );
}

export default Routes;