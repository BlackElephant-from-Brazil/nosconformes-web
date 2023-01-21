import React from 'react'
import '@testing-library/jest-dom'
import { act, cleanup, fireEvent, render, RenderResult, within } from '@testing-library/react'
import { Company } from 'interfaces/company.type'
import { v4 } from 'uuid'
import mockAxios from 'jest-mock-axios'
import { CompanyDetails } from 'modules/companies/pages/company-details'
import { Auditor } from 'interfaces/auditor.type'

let companyDetailsPageElement: RenderResult

const companyId = v4()
const mockResolverCompanyId = [companyId]

const company: Company = {
	_eq: companyId,
	logo: 'https://s.yimg.com/ny/api/res/1.2/a19vkjSUoD4hVV0djOpSLw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02Nzc-/https://s.yimg.com/os/creatr-uploaded-images/2020-07/20e95610-d02d-11ea-9f0c-81042fd4c51a',
	name: 'Casas Bahia',
	manager: {
		name: 'Daniel Ribeiro',
		office: 'Chefe de TI',
		department: 'TI',
		email: 'daniel@casasbahia.com.br',
		phone: '19995545043'
	},
	status: 'late',
	cnpj: '27777505000113',
	site: 'https://casasbahia.com.br',
	auditors: [
		{
			_eq: 'id-auditor-1',
			name: 'Patrick Pessoa',
			photo: 'https://cdn.vnda.com.br/cobogo/2021/10/29/19_10_3_309_site_autor_PatrickPessoa.jpg?v=1638557521'
		},
		{
			_eq: 'id-auditor-2',
			name: 'Raquel Ribeiro',
			photo: 'https://www.arita.com.br/wp-content/uploads/2020/08/pessoa-expansiva-principais-caracteristicas-desta-personalidade.jpg'
		}
	]
}

const availableAuditors: Auditor[] = [
	{
		_eq: 'id-auditor-available-1',
		name: 'Renato Silva',
		photo: 'https://www.arita.com.br/wp-content/uploads/2020/08/pessoa-expansiva-principais-caracteristicas-desta-personalidade.jpg'
	},
	{
		_eq: 'id-auditor-available-2',
		name: 'Adriana Menezes',
		photo: 'https://www.arita.com.br/wp-content/uploads/2020/08/pessoa-expansiva-principais-caracteristicas-desta-personalidade.jpg'
	}
]

const mockedUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
	useNavigate: () => mockedUseNavigate,
	useParams: () => ({ companyId: mockResolverCompanyId[0] }),
}))

const mockedEnqueueSnackbar = jest.fn()

jest.mock('notistack', () => ({
	enqueueSnackbar: () => mockedEnqueueSnackbar
}))

describe('<CompanyDetails/>', () => {

	beforeEach(async () => {
		mockAxios.get.mockImplementation().mockResolvedValue({ data: { company, availableAuditors } })

		await act(async () => {
			companyDetailsPageElement = render(<CompanyDetails />)
		})
	})

	afterEach(() => {
		cleanup()
		mockAxios.reset()
	})

	it('should be able to render the page correctly', async () => {
		expect(mockAxios.get).toHaveBeenCalledWith(`/companies/${companyId}`)
		expect(await companyDetailsPageElement.findByText('Empresas')).toBeInTheDocument()
		expect(await companyDetailsPageElement.findByText('Auditores')).toBeInTheDocument()
		expect(await companyDetailsPageElement.findByTestId('back-button')).toBeInTheDocument()
		expect(await companyDetailsPageElement.findByText('Dados da empresa')).toBeInTheDocument()
		expect(await companyDetailsPageElement.findByText('Dados do gestor')).toBeInTheDocument()
		expect(await companyDetailsPageElement.findByLabelText('Nome da empresa')).toBeInTheDocument()
		expect(await companyDetailsPageElement.findByLabelText('CNPJ')).toBeInTheDocument()
		expect(await companyDetailsPageElement.findByLabelText('Site')).toBeInTheDocument()
		expect((await companyDetailsPageElement.findByLabelText('Nome da empresa')).closest('input')?.value).toBe(company.name)
		expect((await companyDetailsPageElement.findByLabelText('CNPJ')).closest('input')?.value).toBe(company.cnpj)
		expect((await companyDetailsPageElement.findByLabelText('Site')).closest('input')?.value).toBe(company.site)
		expect(await companyDetailsPageElement.findByText('Salvar alterações')).toBeInTheDocument()
	})

	it('should be able to go back to companies list if user click in back button', async () => {
		const backButton = await companyDetailsPageElement.findByTestId('back-button')
		await act(async () => {
			fireEvent.click(backButton)
		})

		expect(mockedUseNavigate).toHaveBeenCalledTimes(1)
		expect(mockedUseNavigate).toHaveBeenCalledWith('/empresas')
	})

	it('should be able to change tabs and initial data should show in all cases', async () => {
		const managerDataTabButton = await companyDetailsPageElement.findByText('Dados do gestor')
		await act(async () => {
			fireEvent.click(managerDataTabButton)
		})

		expect(companyDetailsPageElement.queryByTestId('tab-company-form')).not.toBeInTheDocument()
		expect(companyDetailsPageElement.queryByTestId('tab-manager-form')).toBeInTheDocument()
		expect((await companyDetailsPageElement.findByLabelText('Nome')).closest('input')?.value).toBe(company.manager?.name)
		expect((await companyDetailsPageElement.findByLabelText('Cargo')).closest('input')?.value).toBe(company.manager?.office)

		const companyDataTabButton = await companyDetailsPageElement.findByText('Dados da empresa')
		await act(async () => {
			fireEvent.click(companyDataTabButton)
		})

		expect(companyDetailsPageElement.queryByTestId('tab-company-form')).toBeInTheDocument()
		expect(companyDetailsPageElement.queryByTestId('tab-manager-form')).not.toBeInTheDocument()
		expect((await companyDetailsPageElement.findByLabelText('Nome da empresa')).closest('input')?.value).toBe(company.name)
		expect((await companyDetailsPageElement.findByLabelText('CNPJ')).closest('input')?.value).toBe(company.cnpj)

		await act(async () => {
			fireEvent.click(managerDataTabButton)
		})

		expect((await companyDetailsPageElement.findByLabelText('Nome')).closest('input')?.value).toBe(company.manager?.name)
		expect((await companyDetailsPageElement.findByLabelText('Cargo')).closest('input')?.value).toBe(company.manager?.office)
	})

	describe('form validations', () => {
		describe('company data form', () => {


			it('should not be able to save company data without the company name', async () => {
				expect(companyDetailsPageElement.queryByTestId('tab-company-form')).toBeInTheDocument()
				expect(companyDetailsPageElement.queryByTestId('tab-manager-form')).not.toBeInTheDocument()

				const companyNameInput = await companyDetailsPageElement.findByLabelText('Nome da empresa')
				fireEvent.change(companyNameInput, {
					target: {
						value: ''
					}
				})
				const saveButton = await companyDetailsPageElement.findByText('Salvar alterações')
				await act(async () => {
					fireEvent.click(saveButton)
				})

				const errorMessage = await companyDetailsPageElement.findByTestId('display-errors')
				expect(errorMessage).toHaveTextContent('Preencha o nome da empresa.')
			})

			it('should not be able to save company data without the company cnpj', async () => {
				expect(companyDetailsPageElement.queryByTestId('tab-company-form')).toBeInTheDocument()
				expect(companyDetailsPageElement.queryByTestId('tab-manager-form')).not.toBeInTheDocument()

				const companyCNPJInput = await companyDetailsPageElement.findByLabelText('CNPJ')
				fireEvent.change(companyCNPJInput, {
					target: {
						value: ''
					}
				})
				const saveButton = await companyDetailsPageElement.findByText('Salvar alterações')
				await act(async () => {
					fireEvent.click(saveButton)
				})

				const errorMessage = await companyDetailsPageElement.findByTestId('display-errors')
				expect(errorMessage).toHaveTextContent('Coloque o CNPJ da empresa.')
			})

			it('should not be able to allow write non numerics characters in cnpj field', async () => {
				expect(companyDetailsPageElement.queryByTestId('tab-company-form')).toBeInTheDocument()
				expect(companyDetailsPageElement.queryByTestId('tab-manager-form')).not.toBeInTheDocument()

				const companyCNPJInput = await companyDetailsPageElement.findByLabelText('CNPJ')
				fireEvent.change(companyCNPJInput, {
					target: {
						value: 'invalid-cnpj'
					}
				})
				const saveButton = await companyDetailsPageElement.findByText('Salvar alterações')
				await act(async () => {
					fireEvent.click(saveButton)
				})

				const errorMessage = await companyDetailsPageElement.findByTestId('display-errors')
				expect(errorMessage).toHaveTextContent('Escreva o CNPJ completo.')
			})

			it('should be able to format cnpj as 27.777.505/0001-13 and save like 27777505000113', async () => {
				mockAxios.put.mockImplementation().mockResolvedValue({ status: 201 })
				expect(companyDetailsPageElement.queryByTestId('tab-company-form')).toBeInTheDocument()
				expect(companyDetailsPageElement.queryByTestId('tab-manager-form')).not.toBeInTheDocument()

				const companyCNPJInput = await companyDetailsPageElement.findByLabelText('CNPJ')
				fireEvent.change(companyCNPJInput, {
					target: {
						value: '12345678900011'
					}
				})

				const saveButton = await companyDetailsPageElement.findByText('Salvar alterações')
				await act(async () => {
					fireEvent.click(saveButton)
				})

				expect(companyCNPJInput.closest('input')?.value).toBe('12.345.678/9000-11')
				expect(mockAxios.put).toHaveBeenCalledTimes(1)
				expect(mockAxios.put).toHaveBeenCalledWith(`/companies/company/${companyId}`, {
					name: company.name,
					cnpj: '12345678900011',
					site: company.site
				})
			})

			it('should not be able to save if cnpj has less than 14 characters', async () => {
				expect(companyDetailsPageElement.queryByTestId('tab-company-form')).toBeInTheDocument()
				expect(companyDetailsPageElement.queryByTestId('tab-manager-form')).not.toBeInTheDocument()

				const companyCNPJInput = await companyDetailsPageElement.findByLabelText('CNPJ')
				fireEvent.change(companyCNPJInput, {
					target: {
						value: '1234567890001'
					}
				})
				const saveButton = await companyDetailsPageElement.findByText('Salvar alterações')
				await act(async () => {
					fireEvent.click(saveButton)
				})

				const errorMessage = await companyDetailsPageElement.findByTestId('display-errors')
				expect(errorMessage).toHaveTextContent('Escreva o CNPJ completo.')
			})

			it('should not be able to save company data without site filled', async () => {
				expect(companyDetailsPageElement.queryByTestId('tab-company-form')).toBeInTheDocument()
				expect(companyDetailsPageElement.queryByTestId('tab-manager-form')).not.toBeInTheDocument()

				const companySiteInput = await companyDetailsPageElement.findByLabelText('Site')
				fireEvent.change(companySiteInput, {
					target: {
						value: ''
					}
				})
				const saveButton = await companyDetailsPageElement.findByText('Salvar alterações')
				await act(async () => {
					fireEvent.click(saveButton)
				})

				const errorMessage = await companyDetailsPageElement.findByTestId('display-errors')
				expect(errorMessage).toHaveTextContent('Insira o site da empresa.')
			})

			it('should not be able to save company data without site is not a valid url', async () => {
				expect(companyDetailsPageElement.queryByTestId('tab-company-form')).toBeInTheDocument()
				expect(companyDetailsPageElement.queryByTestId('tab-manager-form')).not.toBeInTheDocument()

				const companySiteInput = await companyDetailsPageElement.findByLabelText('Site')
				fireEvent.change(companySiteInput, {
					target: {
						value: 'invalid-url'
					}
				})
				const saveButton = await companyDetailsPageElement.findByText('Salvar alterações')
				await act(async () => {
					fireEvent.click(saveButton)
				})

				const errorMessage = await companyDetailsPageElement.findByTestId('display-errors')
				expect(errorMessage).toHaveTextContent('O site precisa ser um endereço web real. Exemplo: https://sitedaempresa.com.br/.')
			})
		})
		describe('manager data form', () => {

			beforeEach(async () => {
				const managerDataTabButton = await companyDetailsPageElement.findByText('Dados do gestor')
				await act(async () => {
					fireEvent.click(managerDataTabButton)
				})
			})

			it('should not be able to save data if name is not filled', async () => {
				const managerNameInput = await companyDetailsPageElement.findByLabelText('Nome')
				fireEvent.change(managerNameInput, {
					target: {
						value: ''
					}
				})
				const saveButton = await companyDetailsPageElement.findByText('Salvar alterações')
				await act(async () => {
					fireEvent.click(saveButton)
				})

				const errorMessage = await companyDetailsPageElement.findByTestId('display-errors')
				expect(errorMessage).toHaveTextContent('Preencha o nome do gestor.')
			})

			it('should not be able to save data if office is not filled', async () => {
				const managerOfficeInput = await companyDetailsPageElement.findByLabelText('Cargo')
				fireEvent.change(managerOfficeInput, {
					target: {
						value: ''
					}
				})
				const saveButton = await companyDetailsPageElement.findByText('Salvar alterações')
				await act(async () => {
					fireEvent.click(saveButton)
				})

				const errorMessage = await companyDetailsPageElement.findByTestId('display-errors')
				expect(errorMessage).toHaveTextContent('Coloque o cargo do gestor.')
			})

			it('should not be able to save data if department is not filled', async () => {
				const managerDepartmentInput = await companyDetailsPageElement.findByLabelText('Departamento')
				fireEvent.change(managerDepartmentInput, {
					target: {
						value: ''
					}
				})
				const saveButton = await companyDetailsPageElement.findByText('Salvar alterações')
				await act(async () => {
					fireEvent.click(saveButton)
				})

				const errorMessage = await companyDetailsPageElement.findByTestId('display-errors')
				expect(errorMessage).toHaveTextContent('Insira o departamento de atuação do gestor na empresa.')
			})

			it('should not be able to save data if email is not filled', async () => {
				const managerEmailInput = await companyDetailsPageElement.findByLabelText('Email')
				fireEvent.change(managerEmailInput, {
					target: {
						value: ''
					}
				})
				const saveButton = await companyDetailsPageElement.findByText('Salvar alterações')
				await act(async () => {
					fireEvent.click(saveButton)
				})

				const errorMessage = await companyDetailsPageElement.findByTestId('display-errors')
				expect(errorMessage).toHaveTextContent('Insira o email do gestor.')
			})

			it('should not be able to save data if email is not a valid email', async () => {
				const managerEmailInput = await companyDetailsPageElement.findByLabelText('Email')
				fireEvent.change(managerEmailInput, {
					target: {
						value: 'invalid-email'
					}
				})
				const saveButton = await companyDetailsPageElement.findByText('Salvar alterações')
				await act(async () => {
					fireEvent.click(saveButton)
				})

				const errorMessage = await companyDetailsPageElement.findByTestId('display-errors')
				expect(errorMessage).toHaveTextContent('O email precisa ser um email válido.')
			})

			it('should not be able to save data if phone is unfilled', async () => {
				const managerPhoneInput = await companyDetailsPageElement.findByLabelText('Telefone')
				fireEvent.change(managerPhoneInput, {
					target: {
						value: ''
					}
				})
				const saveButton = await companyDetailsPageElement.findByText('Salvar alterações')
				await act(async () => {
					fireEvent.click(saveButton)
				})

				const errorMessage = await companyDetailsPageElement.findByTestId('display-errors')
				expect(errorMessage).toHaveTextContent('Por favor, preencha o telefone deste gestor.')
			})

			it('should not be able to write non numeric characters in phone fields', async () => {
				const managerPhoneInput = await companyDetailsPageElement.findByLabelText('Telefone')
				fireEvent.change(managerPhoneInput, {
					target: {
						value: 'invalid-chars'
					}
				})
				const saveButton = await companyDetailsPageElement.findByText('Salvar alterações')
				await act(async () => {
					fireEvent.click(saveButton)
				})

				const errorMessage = await companyDetailsPageElement.findByTestId('display-errors')
				expect(errorMessage).toHaveTextContent('Por favor, preencha o telefone deste gestor.')
			})

			it('should be able to format phone like (00) 0000-0000 or (00) 00000-0000', async () => {
				const managerPhoneInput = await companyDetailsPageElement.findByLabelText('Telefone')
				fireEvent.change(managerPhoneInput, {
					target: {
						value: '1212341234'
					}
				})

				expect(managerPhoneInput.closest('input')?.value).toBe('(12) 1234-1234')
				const saveButton = await companyDetailsPageElement.findByText('Salvar alterações')
				await act(async () => {
					fireEvent.click(saveButton)
				})

				expect(mockAxios.put).toHaveBeenCalledTimes(1)
				expect(mockAxios.put).toHaveBeenCalledWith(`/companies/manager/${companyId}`, {
					name: company.manager?.name,
					office: company.manager?.office,
					department: company.manager?.department,
					email: company.manager?.email,
					phone: '1212341234'
				})
			})
		})
	})

	describe('auditors dialog', () => {
		beforeEach(async () => {
			const auditorsOpenDialogButton = await companyDetailsPageElement.findByText('Auditores')
			await act(async () => {
				fireEvent.click(auditorsOpenDialogButton)
			})
		})
		it('should be able to open and render the auditors dialog correctly', async () => {
			expect(await companyDetailsPageElement.findByText('Pessoas com acesso')).toBeVisible()
			expect(await companyDetailsPageElement.findByLabelText('Adicione auditores')).toBeVisible()
			expect(await companyDetailsPageElement.findByText('Concluído')).toBeVisible()
		})

		it('should close the auditors dialog when click in Concluído or in close button', async () => {
			const closeButton = await companyDetailsPageElement.findByTestId('close-button')
			await act(async () => {
				fireEvent.click(closeButton)
			})

			expect(companyDetailsPageElement.queryByText('Pessoas com acesso')).not.toBeVisible()

			const auditorsOpenDialogButton = await companyDetailsPageElement.findByText('Auditores')
			await act(async () => {
				fireEvent.click(auditorsOpenDialogButton)
			})

			expect(companyDetailsPageElement.queryByText('Pessoas com acesso')).toBeVisible()

			const concluedButton = await companyDetailsPageElement.findByText('Concluído')
			await act(async () => {
				fireEvent.click(concluedButton)
			})

			expect(companyDetailsPageElement.queryByText('Pessoas com acesso')).not.toBeVisible()
		})

		it('should be able to show all auditors when user click in find for input, allow select and save to database', async () => {
			const auditorsSelect = await companyDetailsPageElement.findByTestId('auditors-select')
			const auditorSelectInput = within(auditorsSelect).getByRole('combobox')
			auditorsSelect.focus()

			fireEvent.change(auditorSelectInput, { target: { value: 'Renato Silva' } })
			fireEvent.keyDown(auditorsSelect, { key: 'ArrowDown' })
			fireEvent.keyDown(auditorsSelect, { key: 'Enter' })

			// await act(async () => {
			// 	fireEvent.click(addAuditorsInput)
			// })

			// console.log(addAuditorsInput)
			// TODO: FIND SOME WAY TO SHOW THIS DATA

			// const renatoAuditor = await companyDetailsPageElement.findByText('Renato Silva')
			// await act(async () => {
			// 	fireEvent.click(renatoAuditor)
			// })

			const concluedButton = await companyDetailsPageElement.findByText('Concluído')
			await act(async () => {
				fireEvent.click(concluedButton)
			})

			expect(mockAxios.put).toHaveBeenCalledTimes(1)
			expect(mockAxios.put).toHaveBeenCalledWith(`/company/auditors/${companyId}`, [
				{
					_eq: 'id-auditor-1',
					name: 'Patrick Pessoa',
					photo: 'https://cdn.vnda.com.br/cobogo/2021/10/29/19_10_3_309_site_autor_PatrickPessoa.jpg?v=1638557521'
				},
				{
					_eq: 'id-auditor-2',
					name: 'Raquel Ribeiro',
					photo: 'https://www.arita.com.br/wp-content/uploads/2020/08/pessoa-expansiva-principais-caracteristicas-desta-personalidade.jpg'
				},
				{
					_eq: 'id-auditor-available-1',
					name: 'Renato Silva',
					photo: 'https://www.arita.com.br/wp-content/uploads/2020/08/pessoa-expansiva-principais-caracteristicas-desta-personalidade.jpg'
				},
			])
		})

		it('should be able to show all registered auditors', async () => {
			expect(await companyDetailsPageElement.findByText('Patrick Pessoa')).toBeInTheDocument()
			expect(await companyDetailsPageElement.findByText('Raquel Ribeiro')).toBeInTheDocument()
		})
	})
})