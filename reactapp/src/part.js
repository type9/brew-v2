class Part extends Set{
    constructor(data){
        console.log(data);
        super()
        this.id = null;
        this.title = null;
        this.group = null;
        this.union = this.union.bind(this);
        if (data.group == "Ingredients"){ // sets ingredient ID and adds ingredient name to the set
            console.log(data.idIngredient);
            this.id = data.idIngredient;
            super.add(data['strIngredient']);
            this.title = data['strIngredient'];
            this.group = data.group;
        } else if(data.group == "Drinks"){ // sets drink ID and adds all composing ingredients to the set
            console.log(data.idDrink);
            this.id = data.idDrink;
            let ingrNum = 1;
            this.title = data['strDrink'];
            this.group = data.group;
            while(data['strIngredient' + ingrNum]) {
                super.add(data['strIngredient' + ingrNum]);
                ingrNum += 1;
            }
        }
    }

    union(setB) {
        let _union = new Set(this)
        for (let elem of setB) {
            _union.add(elem)
        }
        return _union
    }
}

export default Part;