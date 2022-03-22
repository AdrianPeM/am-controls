import React, { memo, useRef, useState } from 'react'
import reactFastCompare from 'react-fast-compare'

import { Accordion, AwesomeAnimation, CharacterField, Flex, Grid, Loading, MessageBox, TextField } from 'components'

const TestComponents = () => {
    const [pass, setPass] = useState('')
    const messageBoxRef = useRef()

    const showMb = () => {
        messageBoxRef.current.show({title: 'Title', content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus maiores libero, praesentium dolorum fugiat'})
    }
    
    return (
        <Grid w100 h100 centerItems columns='auto 1fr' gap='1em 2em' padding='1em'>
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
            <p>Flex</p>
            <Flex padding='1em' justify='center' style={{gap: '15px'}} onClick={e => console.log(e._reactName, ' flex')}>
                <p>Click</p>
                <p>Console log</p>
            </Flex>
            <p>Accordion</p>
            <Accordion title='Lorem ipsum'>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus maiores libero, praesentium dolorum fugiat, perspiciatis nam ipsum deleniti, ut aliquam hic enim accusantium quisquam quo sit temporibus magni iure. Magnam!
                </p>
            </Accordion>
            <p>MessageBox</p>
            <button onClick={showMb}>Show MB</button>
            <MessageBox ref={messageBoxRef}/>
        </Grid>
    )
}

export default memo(TestComponents, reactFastCompare)
