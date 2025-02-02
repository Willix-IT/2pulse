import { createContext, useContext, ReactNode } from 'react';

interface ApiProviderProps {
    baseUrl: string;
    children: ReactNode
}

const ApiContext = createContext<string|null>(null)

export const ApiProvider: React.FC<ApiProviderProps> = ({baseUrl, children}) => {
    return <ApiContext.Provider value={baseUrl}>{children}</ApiContext.Provider>
}

export const getApiUrl = () => {
    const baseUrl = useContext(ApiContext);
    if (!baseUrl) {
        throw new Error("getApiUrl must be used in the Api Provider")
    }
    return baseUrl
}