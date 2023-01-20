import React from 'react'
import '@testing-library/jest-dom'
import { act, cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import { Company } from 'interfaces/company.type'
import { v4 } from 'uuid'
import mockAxios from 'jest-mock-axios'
import { CompanyDetails } from 'modules/companies/pages/company-details'

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

const mockedUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
	useNavigate: () => mockedUseNavigate,
	useParams: () => ({ companyId: mockResolverCompanyId[0] }),
}))

describe('<CompanyDetails/>', () => {

	beforeEach(async () => {
		mockAxios.get.mockImplementation().mockResolvedValue({ data: company })

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
		setTimeout(() => {
			expect(companyDetailsPageElement.queryByTestId('company-details-body')).not.toBeInTheDocument()
		}, 1000)
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
				expect(1).toBe(2)
			})
			it('should not be able to save company data without the company cnpj', async () => {
				expect(1).toBe(2)
			})
			it('should not be able to allow write non numerics characters in cnpj field', async () => {
				expect(1).toBe(2)
			})
			it('should be able to format cnpj as 27.777.505/0001-13 and save like 27777505000113', async () => {
				expect(1).toBe(2)
			})
			it('should not be able to save if cnpj has less than 14 characters', async () => {
				expect(1).toBe(2)
			})
			it('should not be able to save company data without site filled', async () => {
				expect(1).toBe(2)
			})
			it('should not be able to save company data without site is not a valid url', async () => {
				expect(1).toBe(2)
			})
		})
		describe('manager data form', () => {
			it('should not be able to save data if name is not filled', async () => {
				expect(1).toBe(2)
			})

			it('should not be able to save data if department is not filled', async () => {
				expect(1).toBe(2)
			})

			it('should not be able to save data if email is not filled', async () => {
				expect(1).toBe(2)
			})

			it('should not be able to save data if email is not a valid email', async () => {
				expect(1).toBe(2)
			})

			it('should not be able to save data if phone is unfilled', async () => {
				expect(1).toBe(2)
			})

			it('should not be able to write non numeric characters in phone fields', async () => {
				expect(1).toBe(2)
			})

			it('should be able to format phone like (00) 0000-0000 or (00) 00000-0000', async () => {
				expect(1).toBe(2)
			})
		})
	})

	describe('auditors dialog', () => {
		it('should be able to open and render the auditors dialog correctly', () => {
			expect(1).toBe(2)
		})

		it('should close the auditors dialog when click in Concluído or in close button', () => {
			expect(1).toBe(2)
		})

		it('should be able to show all auditors when user click in find for input', () => {
			expect(1).toBe(2)
		})

		it('should be able to show all registered auditors', () => {
			expect(1).toBe(2)
		})
	})
})