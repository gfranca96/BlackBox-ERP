import { createContext, useState } from "react";
import { Login, Logout, criarLogin, DeleteUsers } from "../services/AuthService";
import { listarDadosUsuario } from "../services/FirestoreService";
import { set } from "react-hook-form";

const UserContext = createContext({
    userID: null,
    logado: false,
    handleLogin: () => { },
    handleLogout: () => { },
    criarLogin: () => { },
    listarDadosUsuario: () => { },
})

export function UserContextProvider(props) {
    const [dadosUser, setDadosUser] = useState([])
    const [currentUser, setCurrentUser] = useState({
        userID: null,
        logado: false,
    })

    async function handleLogin(email, senha) {
        try {
            const id = await Login(email, senha)
            setCurrentUser({ userID: email, logado: true })
        } catch (error) {
            throw Error(error.message)
        }
    }

    async function buscaDadosUsuario() {
        try {
            const dados = await listarDadosUsuario(currentUser.userID)
            setDadosUser(dados)
        } catch (error) {
            throw Error(error.message)
        }
    }

    async function cadastrarUsuario(email, senha) {
        try {
            const id = await criarLogin(email, senha)
            setCurrentUser({ userID: email, logado: true })
        } catch (error) {
            throw Error(error.message)
        }
    }

    async function handleLogout() {
        await Logout()
        setCurrentUser({ userID: null, logado: false })
    }

    async function deleteUser() {
        try {
            await DeleteUsers()
            setCurrentUser({ userID: null, logado: true })
        } catch (error) {
            throw Error(error.message)
        }
        setCurrentUser({ userID: null, logado: false })
    }

    const contexto = {
        userID: currentUser.userID,
        logado: currentUser.logado,
        dadosUser,
        handleLogin,
        handleLogout,
        criarLogin: cadastrarUsuario,
        buscaDadosUsuario,
        deleteUser
    }
    return (
        <UserContext.Provider value={contexto}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext