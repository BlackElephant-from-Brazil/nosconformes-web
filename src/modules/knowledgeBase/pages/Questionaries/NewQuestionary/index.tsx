import React, { useState } from 'react'
import { BT_PRIMARY_ORANGE, Button, BT_PRIMARY } from '../../../../../components/Button'
import { QuestionaryNameInput } from '../../../components/QuestionaryNameInput'
import { Container, Body } from './styles'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import LockIcon from '@mui/icons-material/Lock'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Menu, MenuItem } from '../../../../../components/Menu'


const menuItems: MenuItem[] = [
	{
		label: 'Novo agrupamento +',
		isPrimary: true,
		click: () => console.log('testando')
	},
	{
		label: 'Agrupamento existente',
		click: () => console.log('testando agrupamento existente')
	}
]

export const NewQuestionary: React.FC = () => {
	const [menuOpen, setMenuOpen] = useState(false)
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

	const toggleMenu = (event?: React.MouseEvent<HTMLButtonElement>) => {
		if (menuOpen)
			setAnchorEl(null)
		else
			setAnchorEl(event?.currentTarget || null)

		setMenuOpen(!menuOpen)
	}

	return (
		<Container>
			<div className="content">
				<div className="add-new-questionary-header">
					<QuestionaryNameInput className='questionary-name-input' />
					<div className="button-group">
						<Button buttonStyle={BT_PRIMARY_ORANGE} icon={<PeopleAltIcon/>} text="Auditores" />
						<Button buttonStyle={BT_PRIMARY} icon={<LockIcon/>} text="Compartilhar" />
					</div>
				</div>
				<Body>
					<Button
						buttonStyle={BT_PRIMARY}
						text="Adicionar um agrupamento"
						icon={<KeyboardArrowDownIcon/>}
						className="add-new-grouping-button"
						onClick={(e) => toggleMenu(e)}
					/>
					<Menu
						anchorEl={anchorEl}
						closeMenu={toggleMenu}
						open={menuOpen}
						menuItems={menuItems}
						menuId='addNewGroupingButtonMenu' />
				</Body>
			</div>
		</Container>
	)
}