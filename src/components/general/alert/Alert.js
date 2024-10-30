'use client'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export const alerta = new Notyf(

	{
		duration: 4500,
		dismissible: true,
		position: {
		x: 'right',
		y: 'top',
		
		},
	
	types: [
		{
		  type: 'warning',
		  background: 'orange',
		  icon: {
			className: 'fas fa-exclamation-circle',
			tagName: 'i',
			text: '',
			color: "has-text-white"
		  }
		},
		{
		  type: 'loading',
		  background: 'white',
		  className : "has-text-success",
		  icon: {
			className: 'fas fas fa-save',
			tagName: 'i',
			text: '',
			color: "has-text-success"
		  }
		},
		{
		  type: 'success',
		  icon: {
			className: 'fas fa-check-circle',
			tagName: 'i',
			text: '',
			color: "has-text-success"
		  }
		},
		{
		  type: 'error',
		  icon: {
			className: 'fas fa-times-circle',
			tagName: 'i',
			text: '',
			color: "has-text-danger"
		  }
		}
	  ]
	}
)

export default alerta