import React, { Component } from 'react';
import PremioForm from './PremioForm';
import { Container, Header, Segment, Feed, Icon, Divider, Button, Checkbox, Popup } from "semantic-ui-react";

export default class AdminUsuarios extends Component {
    constructor (props){
        super(props);
        this.state={
            premios: [],
            premioAEditar: {}
        }
        this.loadPremios()
        this.onEditar()
    }

    loadPremios = () => {
        fetch('/api/premios')
        .then (res => res.json())
        .then (data => this.setState({ premios: data, premioAEditar: {} }) )
    }

    onEditar = (premio) => {
        this.setState({ premioAEditar: premio })
    }

    onDesactivarPremio = (premio) => {
        fetch(`/api/premios/${premio.id}`, {
           method: 'PATCH',
           body: JSON.stringify({ activo: premio.activo ? 0 : 1 }),
           headers: {'Content-Type':'application/json'}
        })
        .then (res => res.json())
        .then (data => this.loadPremios())
    }

    // onDeletePremio = (id) => {
    //     console.log('id utilizado en el delete premio:', id)
    //     fetch(`/api/premios/${id}`, {
    //         method: 'DELETE'
    //     })
    //     .then (res => res.json()) 
    //     .then (data => this.loadPremios())
    // }
     
    render() {
        const premios= this.state.premios.filter(p => p.activo === 1)
        const premios_inactivos= this.state.premios.filter(p => p.activo === 0)
        return (
        <Container fluid={true} className='containerAll'>  
            <Header inverted as='h2' block>
                Administrar Premios 
            </Header> 
{/* --------------------------------- Formulario Premios -------------------------------------- */}
            <Segment raised >
                <PremioForm premio={this.state.premioAEditar} onLoadPremios={this.loadPremios}/>
            </Segment>
            <Segment raised >
{/* --------------- Listado de premios donde se pueden activar/desactivar y editar ------------- */}
                <Feed>
                    <Header as='h3' textAlign='center'>
                        Listado de Premios
                    </Header>
                <Divider/>
{/* ------------------------------------- Premios Activos ------------------------------------- */}
                    {premios.map(premio => 
                    <Feed.Event>
                        <Feed.Label>
{/* Botton editar premio */}
                            <Button animated circular inverted color='blue'
                                onClick={ () => this.onEditar(premio) } >
                                <Button.Content hidden>Editar</Button.Content>
                                <Button.Content visible><Icon name='gift' color='black'/></Button.Content>
                            </Button>
                        </Feed.Label>
{/* Info premio */}
                        <Feed.Content>
                            <Feed.Summary>
                                <span className='listadoPremio1'>{premio.nombre} tiene un coste de {premio.puntos} puntos. </span>
                            </Feed.Summary>
                            <Feed.Extra className='spaceBetween'>
                                <span className='listadoPremio2'>Detalles adicionales: {premio.descripcion}</span>
{/* Toggle Activo/noActivo */}
                                <Popup 
                                    trigger={<Checkbox toggle
                                                value= {premio.activo}
                                                checked={premio.activo}
                                                onChange= {() => this.onDesactivarPremio(premio)}
                                            />}
                                    content='"Toggle" a la izquierda para desactivar el premio.'
                                    basic inverted
                                />
{/* Boton de DELETE */}
                                {/* <Button floated='right' animated circular inverted color='black'
                                     onClick={()=> this.onDeletePremio(premio.id)}
                                >
                                    <Button.Content hidden>Delete</Button.Content>
                                    <Button.Content visible>
                                        <Icon name='trash' inverted color='black'/>
                                    </Button.Content>
                                </Button>  */}
                            </Feed.Extra>
                        </Feed.Content>
                    </Feed.Event>)}
{/* ------------------------------------ Premios Inactivos ------------------------------------ */}
                    {premios_inactivos.map(premio => 
                    <Feed.Event>
                        <Feed.Label>
{/* Botton editar premio */}
                            <Button animated circular inverted color='grey'
                                onClick={ () => this.onEditar(premio) } >
                                <Button.Content hidden>Editar</Button.Content>
                                <Button.Content visible><Icon name='gift' color='black'/></Button.Content>
                            </Button>
                        </Feed.Label>
                        <Feed.Content>
                            <Feed.Summary>
                                <span className='listadoPremio1 Inactivo'>{premio.nombre} tiene un coste de {premio.puntos} puntos. </span>
                            </Feed.Summary>
                            <Feed.Summary className='spaceBetween'>
                                <span className='listadoPremio2 Inactivo'>Detalles adicionales: {premio.descripcion}</span>
{/* Toggle Activo/noActivo */}
                                <Popup 
                                    trigger={<Checkbox toggle
                                                value= {premio.activo}
                                                checked={premio.activo}
                                                onChange= {() => this.onDesactivarPremio(premio)}
                                            />}
                                    content='"Toggle" a la derecha para activar el premio nuevamente.'
                                    basic inverted
                                />
                            </Feed.Summary>
                        </Feed.Content>
                    </Feed.Event>)}
                </Feed>
            </Segment>
        </Container>
        )
    }
}
