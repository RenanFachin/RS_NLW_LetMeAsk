import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from '../services/firebase'


// Tipando as infos de dentro do context
type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>; // PROMISE pq são ASYNC AWAIT as funções e void é o retorno da promise
}

// Para utilizar o context é necessário que ele seja exportado
export const AuthContext = createContext({} as AuthContextType)


// Tipando o formato do usuário
type User = {
    id: string;
    name: string;
    avatar: string;
}


// Tipando o children (que são as rotas)
type AuthContextProviderProps = {
    children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<User>()

    async function signInWithGoogle() {
        // autenticação do usuário com o google
        const provider = new firebase.auth.GoogleAuthProvider()

        // Abrindo a autenticação como um popup
        const result = await auth.signInWithPopup(provider)

        // salvando a informação do usuário no state
        if (result.user) {
            const { displayName, photoURL, uid } = result.user

            if (!displayName || !photoURL) {
                throw new Error('Missing Information from Google Account')
            }

            // Atribuindo os valores retornados da autenticação para o objeto de usuário
            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
            })
        }

    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, photoURL, uid } = user

                if (!displayName || !photoURL) {
                    throw new Error('Missing Information from Google Account')
                }

                // Atribuindo os valores retornados da autenticação para o objeto de usuário
                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL
                })
            }

        })

        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    )
}