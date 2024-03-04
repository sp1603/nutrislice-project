export default async function handler(req, res) {
    if(req.method === "GET") {
        const {dining_hall, meal, year, month, day} = req.query
        const url = `https://techdining.api.nutrislice.com/menu/api/weeks/school/${dining_hall}/menu-type/${meal}/${year}/${month}/${day}/`
        const response = await fetch(url)

        try {
            const data = await response.json()
            const parsed_data = data_parser(day, data);
           
            res.status(200).send(parsed_data)
        } catch {
            return res.status(500).send("Failed")
        }
    }
    
}

function data_parser(day, data) {
    const starting_date = parseInt(data.start_date.substring(8)) - 1;
    let currentSection = null;
    const menuData = {};
    data.days[day - starting_date].menu_items.forEach((menuItem) => {
        if (menuItem.is_section_title) {
            currentSection = menuItem.text;
        } else if (menuItem.food) {
            if (!menuData[currentSection]) {
                menuData[currentSection] = [];
            }
            menuData[currentSection].push(menuItem.food.name);
        }
    });

    return menuData;
}