import React from 'react'
import TodoList from '../components/TodoList'
import ContentFooter from './ContentFooter'
const Content = () => {
  return (
    <>
    <section className="main">

		<input className='toggle-all' type='checkbox'/>
		<label>
			Mark all as complete
		</label>

		<TodoList/>
	</section>
    <ContentFooter/>
    </>
  )
}

export default Content
