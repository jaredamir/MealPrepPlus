
export const MEASUREMENTS =[
    "item(s)",
    "oz",
    "gram(s)",
    "lb(s)",
    "tbsp(s)",
    "tsp(s)",
    "liter(s)",
    "fl. oz",
    "pint(s)",
    "cup(s)",
    "mg(s)",
    "quart(s)",
]

export const EXAMPLE_INGREDIENTS = [
    {
        name: "tomato",
        type: "ingredient",
        serving_amount: 1,
        measurement: "item(s)",
        cal: 20,
        pro: 1,
        carb: 5,
        fats: 0,
        sugar: 10,
        price: 1.50
    },
    {
        name: "Lettuce",
        type: "ingredient",
        serving_amount: 10,
        measurement: "grams",
        cal: 10,
        pro: 1,
        carb: 1,
        fats: 0,
        sugar: 2,
        price: 0.50
    },
    {
        name: "Chicken",
        type: "ingredient",
        serving_amount: 100,
        measurement: "grams",
        cal: 100,
        pro: 30,
        carb: 1,
        fats: 0,
        sugar: 0,
        price: 5.00
    }
]

export const EXAMPLE_MEAL = {
    name: "CLT Sandwich",
    items: [
        {
            name: "tomato",
            type: "ingredient",
            serving_amount: 1,
            inputAmount: .5,
            measurement: "item(s)",
            cal: 20,
            pro: 1,
            carb: 5,
            fats: 0,
            sugar: 10,
            price: 1.50
        },
        {
            name: "Lettuce",
            type: "ingredient",
            serving_amount: 10,
            inputAmount: 20,
            measurement: "grams",
            cal: 10,
            pro: 1,
            carb: 1,
            fats: 0,
            sugar: 2,
            price: 0.50
        },
        {
            name: "Chicken",
            type: "ingredient",
            serving_amount: 100,
            inputAmount: 50,
            measurement: "grams",
            cal: 100,
            pro: 30,
            carb: 1,
            fats: 0,
            sugar: 0,
            price: 5.00
        }
    ]
}

export const TEST_USER_DATA = {
    name: "jared",
    ingredients: EXAMPLE_INGREDIENTS,
    meals: [EXAMPLE_MEAL, EXAMPLE_MEAL, EXAMPLE_MEAL]

};