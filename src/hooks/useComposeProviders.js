import React from 'react'

const useComposeProviders = (...providers) => ({ children }) => 
    providers.reduceRight( (child, Provider) => <Provider>{child}</Provider>, children )

export default useComposeProviders