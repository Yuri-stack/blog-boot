import { Tab, Tabs } from 'react-bootstrap'

import ListaPostagens from '../ListaPostagens/ListaPostagens'

import './TabPostagem.css'

function TabPostagem() {
  return (
    <Tabs
        className="mb-3 d-flex justify-content-center tabs-estilo"
        defaultActiveKey="posts"
        fill
    >
        <Tab eventKey="posts" title="Postagens" className=''>
            <ListaPostagens />
        </Tab>
        <Tab eventKey="about" title="Sobre Nós" className='text-light'>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus ipsa, natus numquam quam distinctio perferendis, pariatur libero at itaque, reprehenderit consectetur repellendus ad nostrum? Expedita adipisci blanditiis eos ipsa est.</p>

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus ipsa, natus numquam quam distinctio perferendis, pariatur libero at itaque, reprehenderit consectetur repellendus ad nostrum? Expedita adipisci blanditiis eos ipsa est.</p>

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus ipsa, natus numquam quam distinctio perferendis, pariatur libero at itaque, reprehenderit consectetur repellendus ad nostrum? Expedita adipisci blanditiis eos ipsa est.</p>
        </Tab>
    </Tabs>
  )
}

export default TabPostagem