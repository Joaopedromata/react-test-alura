import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import App, { calcularNovoSaldo } from './App'

describe('Componente princial', () => {
    describe('Quando eu abro o app do banco', () => {
        it('o nome e exibido', () => {
            render(<App />)
    
            expect(screen.getByText('ByteBank')).toBeInTheDocument()
        })
        it('o saldo e exibido', () => {
            render(<App />)
        
            expect(screen.getByText('Saldo:')).toBeInTheDocument()
        })
        it('o botao de realizar transacao e exibido', () => {
            render(<App />)
    
            expect(screen.getByText('Realizar operação'))
        })
    })

    describe('Quando eu realizo uma transacao', () => {
        it('que e um saque, o valor vai diminuir', () => {
            const valores = {
                transacao: 'saque',
                valor: 50
            }
            const novoSaldo = calcularNovoSaldo(valores, 150)
            expect(novoSaldo).toBe(100)
        })
        it('que e um deposito, o valor vai aumentar', () => {
            const valores = {
                transacao: 'deposito',
                valor: 50
            }
            const novoSaldo = calcularNovoSaldo(valores, 150)
            expect(novoSaldo).toBe(200)
        })
        it('que e um saque, a transacao de ser realizada', () => {
            render(<App />)

            const saldo = screen.getByText('R$ 1000')
            const transacao = screen.getByLabelText('Saque')
            const valor = screen.getByTestId("valor")
            const botaoTransacao = screen.getByText('Realizar operação')

            expect(saldo.textContent).toBe('R$ 1000')

            fireEvent.click(transacao, { target: { value: 'saque' }})
            fireEvent.change(valor, { target: { value: 10 }})
            fireEvent.click(botaoTransacao)

            expect(saldo.textContent).toBe('R$ 990')
        })
    })
})

