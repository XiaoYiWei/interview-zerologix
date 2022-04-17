import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './layouts/login'
import { QueryErrorResetBoundary } from 'react-query'
import { ErrorBoundary } from 'react-error-boundary'
import OutlinedButton from './components/OutlinedButton'
import loadable from '@loadable/component'

const Layout = loadable(() => import('./components/Layout'))
const UnregisteredLesson = loadable(
    () => import('./layouts/unregisteredLesson')
)
const RegisteredLesson = loadable(() => import('./layouts/registeredLesson'))
const Notfound = loadable(() => import('./layouts/notfound'))

function App() {
    return (
        <QueryErrorResetBoundary>
            {({ reset }) => (
                <ErrorBoundary
                    onReset={reset}
                    fallbackRender={({ error, resetErrorBoundary }) => (
                        <div>
                            <p>There was an error!</p>
                            <pre>{error.message}</pre>
                            <OutlinedButton
                                onClick={() => resetErrorBoundary()}
                            >
                                Try again
                            </OutlinedButton>
                        </div>
                    )}
                >
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<UnregisteredLesson />} />
                            <Route
                                path="my_webinars"
                                element={<RegisteredLesson />}
                            />
                            <Route path="Login" element={<Login />} />
                            <Route path="*" element={<Notfound />} />
                        </Route>
                    </Routes>
                </ErrorBoundary>
            )}
        </QueryErrorResetBoundary>
    )
}

export default App
