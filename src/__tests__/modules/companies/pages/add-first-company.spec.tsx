import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { AddFirstCompany } from '../../../../modules/companies/pages/add-first-company'


const mockedUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
	useNavigate: () => mockedUseNavigate,
}))

let addFirstCompanyPageElement: RenderResult

describe('<AddFristCompany />', () => {
	beforeEach(() => {
		addFirstCompanyPageElement = render(<AddFirstCompany />)
	})

	describe('Create your first company initial page', () => {
		it('should be able to render the page correctly', async () => {
			expect(await addFirstCompanyPageElement.findByText('Empresas')).toBeInTheDocument()
			expect(await addFirstCompanyPageElement.findByText('Cadastre novas empresas 🏭')).toBeInTheDocument()
			expect(await addFirstCompanyPageElement.findByText('Adicione os dados da empresa')).toBeInTheDocument()
			expect(await addFirstCompanyPageElement.findByText('Adicione os dados do gestor')).toBeInTheDocument()
			expect(await addFirstCompanyPageElement.findByText('Cadastrar primeira empresa ->')).toBeInTheDocument()
			expect(await addFirstCompanyPageElement.findByText('1')).toBeInTheDocument()
			expect(await addFirstCompanyPageElement.findByText('2')).toBeInTheDocument()
			expect(addFirstCompanyPageElement.queryByText('Adicione os dados da empresa:')).not.toBeInTheDocument()
			expect(addFirstCompanyPageElement.queryByText('Adicione os dados do gestor:')).not.toBeInTheDocument()
		})

		it('should be able to render the add company form when click in "Cadastrar primeira empresa"', async () => {
			const addFirstCompanyButton = await addFirstCompanyPageElement.findByText('Cadastrar primeira empresa ->')
			fireEvent.click(addFirstCompanyButton)
			expect(addFirstCompanyPageElement.queryByTestId('add-first-company')).not.toBeInTheDocument()
			expect(addFirstCompanyPageElement.queryByTestId('add-company-data-tab')).toBeInTheDocument()
			expect(addFirstCompanyPageElement.queryByTestId('add-manager-data-tab')).not.toBeInTheDocument()
		})
	})

	describe('Add company data tab', () => {
		beforeEach(async () => {
			const addFirstCompanyButton = await addFirstCompanyPageElement.findByText('Cadastrar primeira empresa ->')
			fireEvent.click(addFirstCompanyButton)
		})

		it('should be able to render company data form correctly', async () => {
			expect(addFirstCompanyPageElement.queryByTestId('add-first-company')).not.toBeInTheDocument()
			expect(addFirstCompanyPageElement.queryByTestId('add-company-data-tab')).toBeInTheDocument()
			expect(addFirstCompanyPageElement.queryByTestId('add-manager-data-tab')).not.toBeInTheDocument()
			expect(await addFirstCompanyPageElement.findByText('Cadastre novas empresas 🏭')).toBeInTheDocument()
			expect(await addFirstCompanyPageElement.findByText('Dados da empresa')).toBeInTheDocument()
			expect(await addFirstCompanyPageElement.findByText('Dados do gestor')).toBeInTheDocument()
			expect(await addFirstCompanyPageElement.findByText('1')).toBeInTheDocument()
			expect(await addFirstCompanyPageElement.findByText('2')).toBeInTheDocument()
			expect(await addFirstCompanyPageElement.findByText('Adicione os dados da empresa:')).toBeInTheDocument()
			expect(await addFirstCompanyPageElement.findByLabelText('Nome da empresa')).toBeInTheDocument()
			expect(await addFirstCompanyPageElement.findByLabelText('CNPJ')).toBeInTheDocument()
			expect(await addFirstCompanyPageElement.findByLabelText('Site')).toBeInTheDocument()
			expect(await addFirstCompanyPageElement.findByText('Próximo')).toBeInTheDocument()
		})

		describe('company data form validations', () => {

			let nextButton: HTMLElement
			beforeEach(async () => {
				nextButton = await addFirstCompanyPageElement.findByText('Próximo')
			})

			it('should not be able to go to manager form if name field is not filled', async () => {
				fireEvent.click(nextButton)
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).toHaveTextContent('Preencha o nome da empresa.')
			})

			it('should not be able to go to manager form if CNPJ field is not filled', async () => {
				const companyNameInput = await addFirstCompanyPageElement.findByLabelText('Nome da empresa')
				fireEvent.change(companyNameInput, {
					target: {
						value: 'valid-company-name'
					}
				})

				fireEvent.click(nextButton)

				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Preencha o nome da empresa.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).toHaveTextContent('Coloque o CNPJ da empresa.')
			})

			it('should not be able to write non numeric characters in CNPJ field', async () => {
				const companyNameInput = await addFirstCompanyPageElement.findByLabelText('Nome da empresa')
				const companyCNPJInput = await addFirstCompanyPageElement.findByLabelText('CNPJ')
				fireEvent.change(companyNameInput, {
					target: {
						value: 'valid-company-name'
					}
				})

				fireEvent.change(companyCNPJInput, {
					target: {
						value: 'invalid-cnpj'
					}
				})

				fireEvent.click(nextButton)

				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Preencha o nome da empresa.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).toHaveTextContent('Coloque o CNPJ da empresa.')
				expect(companyCNPJInput.closest('input')?.value).toBe('')
			})

			it('should not be able to go to manager form if CNPJ has less then 14 charachters', async () => {
				const companyNameInput = await addFirstCompanyPageElement.findByLabelText('Nome da empresa')
				const companyCNPJInput = await addFirstCompanyPageElement.findByLabelText('CNPJ')
				fireEvent.change(companyNameInput, {
					target: {
						value: 'valid-company-name'
					}
				})

				fireEvent.change(companyCNPJInput, {
					target: {
						value: '277775050001'
					}
				})

				fireEvent.click(nextButton)

				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Preencha o nome da empresa.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Coloque o CNPJ da empresa.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).toHaveTextContent('Escreva o CNPJ completo.')
			})

			it('should be able to format CNPJ like 00.000.000/0000-00', async () => {
				const companyNameInput = await addFirstCompanyPageElement.findByLabelText('Nome da empresa')
				const companyCNPJInput = await addFirstCompanyPageElement.findByLabelText('CNPJ')
				fireEvent.change(companyNameInput, {
					target: {
						value: 'valid-company-name'
					}
				})

				fireEvent.change(companyCNPJInput, {
					target: {
						value: '27777505000113'
					}
				})

				fireEvent.click(nextButton)

				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Preencha o nome da empresa.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Coloque o CNPJ da empresa.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Escreva o CNPJ completo.')
				expect(companyCNPJInput.closest('input')?.value).toBe('27.777.505/0001-13')

			})

			it('should not be able to go to manager form if site field is not filled', async () => {
				const companyNameInput = await addFirstCompanyPageElement.findByLabelText('Nome da empresa')
				const companyCNPJInput = await addFirstCompanyPageElement.findByLabelText('CNPJ')
				fireEvent.change(companyNameInput, {
					target: {
						value: 'valid-company-name'
					}
				})

				fireEvent.change(companyCNPJInput, {
					target: {
						value: '27777505000113'
					}
				})

				fireEvent.click(nextButton)

				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Preencha o nome da empresa.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Coloque o CNPJ da empresa.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Escreva o CNPJ completo.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).toHaveTextContent('Insira o site da empresa.')
			})

			it('should not be able to go to manager form if site field is not valid', async () => {
				const companyNameInput = await addFirstCompanyPageElement.findByLabelText('Nome da empresa')
				const companyCNPJInput = await addFirstCompanyPageElement.findByLabelText('CNPJ')
				const companySiteInput = await addFirstCompanyPageElement.findByLabelText('Site')
				fireEvent.change(companyNameInput, {
					target: {
						value: 'valid-company-name'
					}
				})

				fireEvent.change(companyCNPJInput, {
					target: {
						value: '27777505000113'
					}
				})

				fireEvent.change(companySiteInput, {
					target: {
						value: 'invalid-site'
					}
				})

				fireEvent.click(nextButton)

				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Preencha o nome da empresa.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Coloque o CNPJ da empresa.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Escreva o CNPJ completo.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Insira o site da empresa.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).toHaveTextContent('O site precisa ser um endereço web real. Exemplo: https://sitedaempresa.com.br/.')
				expect(addFirstCompanyPageElement.queryByTestId('add-manager-data-tab')).not.toBeInTheDocument()
			})

			it('should be able to go to managers form if all field are correctly filled', async () => {
				const companyNameInput = await addFirstCompanyPageElement.findByLabelText('Nome da empresa')
				const companyCNPJInput = await addFirstCompanyPageElement.findByLabelText('CNPJ')
				const companySiteInput = await addFirstCompanyPageElement.findByLabelText('Site')
				fireEvent.change(companyNameInput, {
					target: {
						value: 'valid-company-name'
					}
				})

				fireEvent.change(companyCNPJInput, {
					target: {
						value: '27777505000113'
					}
				})

				fireEvent.change(companySiteInput, {
					target: {
						value: 'https://validsite.com.br/'
					}
				})

				await act(async () => {
					fireEvent.click(nextButton)
				})

				expect(addFirstCompanyPageElement.queryByTestId('add-company-data-tab')).not.toBeInTheDocument()
				expect(addFirstCompanyPageElement.queryByTestId('add-manager-data-tab')).toBeInTheDocument()
			})
		})
	})

	describe('Add manager data tab', () => {
		beforeEach(async () => {
			const addFirstCompanyButton = await addFirstCompanyPageElement.findByText('Cadastrar primeira empresa ->')
			fireEvent.click(addFirstCompanyButton)

			const nextButton = await addFirstCompanyPageElement.findByText('Próximo')
			const companyNameInput = await addFirstCompanyPageElement.findByLabelText('Nome da empresa')
			const companyCNPJInput = await addFirstCompanyPageElement.findByLabelText('CNPJ')
			const companySiteInput = await addFirstCompanyPageElement.findByLabelText('Site')
			fireEvent.change(companyNameInput, {
				target: {
					value: 'valid-company-name'
				}
			})

			fireEvent.change(companyCNPJInput, {
				target: {
					value: '27777505000113'
				}
			})

			fireEvent.change(companySiteInput, {
				target: {
					value: 'https://validsite.com.br/'
				}
			})

			await act(async () => {
				fireEvent.click(nextButton)
			})
		})

		it('should be able to render manager data form correctly', async () => {
			expect(addFirstCompanyPageElement.queryByTestId('add-first-company')).not.toBeInTheDocument()
			expect(addFirstCompanyPageElement.queryByTestId('add-company-data-tab')).not.toBeInTheDocument()
			expect(addFirstCompanyPageElement.queryByTestId('add-manager-data-tab')).toBeInTheDocument()
			expect(addFirstCompanyPageElement.queryByText('Cadastre novas empresas 🏭')).toBeInTheDocument()
			expect(addFirstCompanyPageElement.queryByText('Dados da empresa')).toBeInTheDocument()
			expect(addFirstCompanyPageElement.queryByText('Dados do gestor')).toBeInTheDocument()
			expect(addFirstCompanyPageElement.queryByText('1')).toBeInTheDocument()
			expect(addFirstCompanyPageElement.queryByText('2')).toBeInTheDocument()
			expect(addFirstCompanyPageElement.queryByText('Adicione os dados da empresa:')).not.toBeInTheDocument()
			expect(addFirstCompanyPageElement.queryByText('Adicione os dados do gestor:')).toBeInTheDocument()
			expect(addFirstCompanyPageElement.queryByLabelText('Nome')).toBeInTheDocument()
			expect(addFirstCompanyPageElement.queryByLabelText('Cargo')).toBeInTheDocument()
			expect(addFirstCompanyPageElement.queryByLabelText('Departamento')).toBeInTheDocument()
			expect(addFirstCompanyPageElement.queryByLabelText('Email')).toBeInTheDocument()
			expect(addFirstCompanyPageElement.queryByLabelText('Telefone')).toBeInTheDocument()
			expect(addFirstCompanyPageElement.queryByText('Pular etapa')).toBeInTheDocument()
			expect(addFirstCompanyPageElement.queryByText('Cadastrar empresa')).toBeInTheDocument()
			expect(addFirstCompanyPageElement.queryByTestId('back-button')).toBeInTheDocument()
		})

		it('should be able to go to companies list page without send and without validate manager data fields if user clicked in "Pular etapa" button', async () => {
			const jumpStepButton = await addFirstCompanyPageElement.findByText('Pular etapa')

			fireEvent.click(jumpStepButton)

			expect(mockedUseNavigate).toHaveBeenCalledTimes(1)
			expect(mockedUseNavigate).toHaveBeenCalledWith('/empresas')

			// TODO: RESOLVE IT IN CODE
			// VERIFY IF FUNCTION IS SENDING COMPANY DATA TO DATABASE
		})

		it('it should be able to go back to companies tab on user click in back button', async () => {
			const backButton = await addFirstCompanyPageElement.findByTestId('back-button')

			await act(async () => {
				fireEvent.click(backButton)
			})

			expect(addFirstCompanyPageElement.queryByTestId('add-company-data-tab')).toBeInTheDocument()
			expect(addFirstCompanyPageElement.queryByTestId('add-manager-data-tab')).not.toBeInTheDocument()
		})

		let registerCompanyButton: HTMLElement
		describe('manager data form validations', () => {
			beforeEach(async () => {
				registerCompanyButton = await addFirstCompanyPageElement.findByText('Cadastrar empresa')
			})

			it('should not be able to save data if name is not filled', async () => {
				fireEvent.click(registerCompanyButton)

				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).toHaveTextContent('Preencha o nome do gestor.')
			})

			it('should not be able to save data if office is not filled', async () => {
				const nameInput = await addFirstCompanyPageElement.findByLabelText('Nome')

				fireEvent.change(nameInput, {
					target: {
						value: 'valid-name'
					}
				})

				fireEvent.click(registerCompanyButton)

				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Preencha o nome do gestor.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).toHaveTextContent('Coloque o cargo do gestor.')
			})

			it('should not be able to save data if department is not filled', async () => {
				const nameInput = await addFirstCompanyPageElement.findByLabelText('Nome')
				const officeInput = await addFirstCompanyPageElement.findByLabelText('Cargo')

				fireEvent.change(nameInput, {
					target: {
						value: 'valid-name'
					}
				})
				fireEvent.change(officeInput, {
					target: {
						value: 'valid-office'
					}
				})

				fireEvent.click(registerCompanyButton)

				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Preencha o nome do gestor.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Coloque o cargo do gestor.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).toHaveTextContent('Insira o departamento de atuação do gestor na empresa.')
			})

			it('should not be able to save data if email is not filled', async () => {
				const nameInput = await addFirstCompanyPageElement.findByLabelText('Nome')
				const officeInput = await addFirstCompanyPageElement.findByLabelText('Cargo')
				const departmentInput = await addFirstCompanyPageElement.findByLabelText('Departamento')

				fireEvent.change(nameInput, {
					target: {
						value: 'valid-name'
					}
				})
				fireEvent.change(officeInput, {
					target: {
						value: 'valid-office'
					}
				})
				fireEvent.change(departmentInput, {
					target: {
						value: 'valid-department'
					}
				})

				fireEvent.click(registerCompanyButton)

				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Preencha o nome do gestor.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Coloque o cargo do gestor.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Insira o departamento de atuação do gestor na empresa.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).toHaveTextContent('Insira o email do gestor.')
			})

			it('should not be able to save data if email is not a valid email', async () => {
				const nameInput = await addFirstCompanyPageElement.findByLabelText('Nome')
				const officeInput = await addFirstCompanyPageElement.findByLabelText('Cargo')
				const departmentInput = await addFirstCompanyPageElement.findByLabelText('Departamento')
				const emailInput = await addFirstCompanyPageElement.findByLabelText('Email')

				fireEvent.change(nameInput, {
					target: {
						value: 'valid-name'
					}
				})
				fireEvent.change(officeInput, {
					target: {
						value: 'valid-office'
					}
				})
				fireEvent.change(departmentInput, {
					target: {
						value: 'valid-department'
					}
				})
				fireEvent.change(emailInput, {
					target: {
						value: 'ivalid-email'
					}
				})

				fireEvent.click(registerCompanyButton)

				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Preencha o nome do gestor.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Coloque o cargo do gestor.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Insira o departamento de atuação do gestor na empresa.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Insira o email do gestor.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).toHaveTextContent('O email precisa ser um email válido.')
			})

			it('should not be able to save data if phone is unfilled', async () => {
				const nameInput = await addFirstCompanyPageElement.findByLabelText('Nome')
				const officeInput = await addFirstCompanyPageElement.findByLabelText('Cargo')
				const departmentInput = await addFirstCompanyPageElement.findByLabelText('Departamento')
				const emailInput = await addFirstCompanyPageElement.findByLabelText('Email')

				fireEvent.change(nameInput, {
					target: {
						value: 'valid-name'
					}
				})
				fireEvent.change(officeInput, {
					target: {
						value: 'valid-office'
					}
				})
				fireEvent.change(departmentInput, {
					target: {
						value: 'valid-department'
					}
				})
				fireEvent.change(emailInput, {
					target: {
						value: 'valid@email.com'
					}
				})

				fireEvent.click(registerCompanyButton)

				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Preencha o nome do gestor.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Coloque o cargo do gestor.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Insira o departamento de atuação do gestor na empresa.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Insira o email do gestor.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('O email precisa ser um email válido.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).toHaveTextContent('Por favor, preencha o telefone deste gestor.')
			})

			it('should not be able to write non numeric characters in phone fields', async () => {
				const nameInput = await addFirstCompanyPageElement.findByLabelText('Nome')
				const officeInput = await addFirstCompanyPageElement.findByLabelText('Cargo')
				const departmentInput = await addFirstCompanyPageElement.findByLabelText('Departamento')
				const emailInput = await addFirstCompanyPageElement.findByLabelText('Email')
				const phoneInput = await addFirstCompanyPageElement.findByLabelText('Telefone')

				fireEvent.change(nameInput, {
					target: {
						value: 'valid-name'
					}
				})
				fireEvent.change(officeInput, {
					target: {
						value: 'valid-office'
					}
				})
				fireEvent.change(departmentInput, {
					target: {
						value: 'valid-department'
					}
				})
				fireEvent.change(emailInput, {
					target: {
						value: 'valid@email.com'
					}
				})
				fireEvent.change(phoneInput, {
					target: {
						value: 'invalid-phone'
					}
				})

				fireEvent.click(registerCompanyButton)

				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Preencha o nome do gestor.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Coloque o cargo do gestor.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Insira o departamento de atuação do gestor na empresa.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('Insira o email do gestor.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).not.toHaveTextContent('O email precisa ser um email válido.')
				expect(await addFirstCompanyPageElement.findByTestId('company-errors')).toHaveTextContent('Por favor, preencha o telefone deste gestor.')
				expect(phoneInput.closest('input')?.value).toBe('')
			})

			it('should be able to format phone like (00) 0000-0000 or (00) 00000-0000', async () => {
				const phoneInput = await addFirstCompanyPageElement.findByLabelText('Telefone')

				fireEvent.change(phoneInput, {
					target: {
						value: '1938764792'
					}
				})

				expect(phoneInput.closest('input')?.value).toBe('(19) 3876-4792')

				fireEvent.change(phoneInput, {
					target: {
						value: '19995545043'
					}
				})

				expect(phoneInput.closest('input')?.value).toBe('(19) 99554-5043')
			})
		})
	})

	it('should be able to save all data after fill all fields correctly and click in Salvar button', async () => {
		const addFirstCompanyButton = await addFirstCompanyPageElement.findByText('Cadastrar primeira empresa ->')
		fireEvent.click(addFirstCompanyButton)

		const nextButton = await addFirstCompanyPageElement.findByText('Próximo')
		const companyNameInput = await addFirstCompanyPageElement.findByLabelText('Nome da empresa')
		const companyCNPJInput = await addFirstCompanyPageElement.findByLabelText('CNPJ')
		const companySiteInput = await addFirstCompanyPageElement.findByLabelText('Site')
		fireEvent.change(companyNameInput, {
			target: {
				value: 'valid-company-name'
			}
		})

		fireEvent.change(companyCNPJInput, {
			target: {
				value: '27777505000113'
			}
		})

		fireEvent.change(companySiteInput, {
			target: {
				value: 'https://validsite.com.br/'
			}
		})

		await act(async () => {
			fireEvent.click(nextButton)
		})

		const registerCompanyButton = await addFirstCompanyPageElement.findByText('Cadastrar empresa')
		const nameInput = await addFirstCompanyPageElement.findByLabelText('Nome')
		const officeInput = await addFirstCompanyPageElement.findByLabelText('Cargo')
		const departmentInput = await addFirstCompanyPageElement.findByLabelText('Departamento')
		const emailInput = await addFirstCompanyPageElement.findByLabelText('Email')
		const phoneInput = await addFirstCompanyPageElement.findByLabelText('Telefone')

		fireEvent.change(nameInput, {
			target: {
				value: 'valid-name'
			}
		})
		fireEvent.change(officeInput, {
			target: {
				value: 'valid-office'
			}
		})
		fireEvent.change(departmentInput, {
			target: {
				value: 'valid-department'
			}
		})
		fireEvent.change(emailInput, {
			target: {
				value: 'valid@email.com'
			}
		})
		fireEvent.change(phoneInput, {
			target: {
				value: '19995545043'
			}
		})

		await act(async () => {
			fireEvent.click(registerCompanyButton)
		})

		expect(mockedUseNavigate).toHaveBeenCalledTimes(1)
		expect(mockedUseNavigate).toHaveBeenCalledWith('/empresas')

		// TODO: INSERT THAT I EXPECT CODE SEND DATA TO DB VIA AXIOS POST AND PAYLOAD {COMPANY, MANAGER}
	})

	it('should be able to persist data when transiting between tabs', async () => {
		expect(1).toBe(2)
		// TODO: WRITE THIS
	})

	afterEach(() => {
		cleanup()
	})
})