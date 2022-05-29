import React, {useState} from 'react'
import {useEffect} from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='



const SingleCocktail = () => {
  console.log('1')
  const {id} = useParams()

  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState(null);
  console.log('2')

  useEffect (() => {
    console.log('render useEffect')

    setLoading(true);
    console.log('3')
    async function getCocktail() {
      try {
        console.log('3.5')
        const response = await fetch(`${url}${id}`);
        console.log('3.7')
        const data = await response.json()
        console.log('data fetched')
        if (data.drinks) {
          console.log('4')
          const {
            strDrink:name,
            strDrinkThumb:image,
            strAlcoholic:info,
            strCategory:category,
            strGlass:glass,
            strInstructions:instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0]
          console.log('4.5')


          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];

          const newCocktail = {
            name, image, info, category, glass, instructions, ingredients
          }
          setCocktail(newCocktail);
          console.log('5')

        } else {
          setCocktail(null)
          console.log('6')
        }
        console.log('set loading to fals')
        setLoading(false)
        console.log('6.5')

      } catch (error) {
        console.log('7')
        console.log(error)
        setLoading(false)
      }
    }
    getCocktail()
  }, [id])

  if (loading) {
    console.log('8')
    return <Loading />
    
  }

  if (!cocktail) {
    console.log('9')
    return <h2 className='section-title'>no cocktail to display</h2>
  }
  console.log('10')

  const {
    name, 
    image,
    info,
    category,
    glass,
    instructions,
    ingredients,
  } = cocktail;

  return (
    <section className='section cocktail-section'>
      <Link to='/' className="btn btn-primary"> Home </Link>
      <h2 className='section-title'>{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">
              Name:
            </span> {name}
          </p>
          <p>
            <span className="drink-data">
              Category:
            </span> {category}
          </p>
          <p>
            <span className="drink-data">
              Info:
            </span> {info}
          </p>
          <p>
            <span className="drink-data">
        glass:
            </span> {glass}
          </p>
          <p>
            <span className="drink-data">
              instructions:
            </span> {instructions}
          </p>
          <p>
            <span className="drink-data">ingredients: </span>
            {ingredients.map((item, index) => {
              return (item? <span key={index}>{item}</span> : null)
            })}
          </p>
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail
