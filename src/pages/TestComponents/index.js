import { CharacterField, TextField } from 'components'
import React, { useState } from 'react'

const TestComponents = () => {
    const [pass, setPass] = useState('')
    return (
        <div>
            <CharacterField length={6}/>
            <TextField type='password' label='Password' placeholder='Type password' value={pass} onChange={setPass}/>
        </div>
    )
}

export default TestComponents
