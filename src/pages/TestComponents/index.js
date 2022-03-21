import { AwesomeAnimation, CharacterField, Loading, TextField } from 'components'
import React, { useState } from 'react'

const TestComponents = () => {
    const [pass, setPass] = useState('')
    return (
        <div style={{display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1em 2em', padding: '1em'}}>
            <p>CharacterField</p>
            <CharacterField length='6'/>
            <p>TextField</p>
            <TextField type='password' label='Password' placeholder='Type password' value={pass} onChange={setPass}/>
            <p>Awesome Animation</p>
            <AwesomeAnimation hover size='2em' icon='angle-down' animation='downUp' />
            <p>Loading</p>
            <div style={{height: '40px', width: '10em'}}>
                <Loading isLoading={true} />
            </div>
        </div>
    )
}

export default TestComponents
