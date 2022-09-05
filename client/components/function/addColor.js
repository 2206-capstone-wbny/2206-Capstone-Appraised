export default function color (arr){
    let zipcodes = this.props.homeCoord.map(home => home.zipcode)
    zipcodes.filter((item, pos) => zipcodes.indexOf(item) == pos)
    let currentZips = zipcodes.filter((item, pos) => zipcodes.indexOf(item) == pos)

    currentZips.map(async(idZips) =>{
      let r = 0;
      let o = 0;
      let y = 0;
      let g = 0;
      let b = 0;

      if(this.props.homeCoord.filter(homm => homm.zipcode == idZips))
      {
        this.props.homeCoord.filter(homm => homm.zipcode == idZips).map(homes => {
          let medPrice
          if(zip.filter(priceSearch => priceSearch.zip == homes.zipcode) && zip.filter(priceSearch => priceSearch.zip == homes.zipcode).length > 0){
          medPrice = zip.filter(priceSearch => priceSearch.zip == homes.zipcode)[0]
        }
          else{
          medPrice = states.filter(state => state.state == homes.state)[0]
          }
          if(homes.type == 'SINGLE_FAMILY')
          {
            // console.log(medPrice)
            homes.priceNum >= (medPrice.singleHMed * 1.25)? r++ : homes.priceNum >= (medPrice.singleHMed * 1.15)? y++ : 
            homes.priceNum >= (medPrice.singleHMed * 1.05)? y++ : homes.priceNum >= (medPrice.singleHMed * .80)? g++ : b++   
          }else if(homes.type == 'CONDO')
          {
            homes.priceNum >= (medPrice.coopMed * 1.25)? r++ : homes.priceNum >= (medPrice.coopMed * 1.15)? y++ : 
            homes.priceNum >= (medPrice.coopMed * 1.05)? y++ : homes.priceNum >= (medPrice.coopMed * .80)? g++ : b++  
          }else if(homes.beds == 1)
          {
            homes.priceNum >= (medPrice.oneBedMed * 1.25)? r++ : homes.priceNum >= (medPrice.oneBedMed * 1.15)? y++ : 
            homes.priceNum >= (medPrice.oneBedMed * 1.05)? y++ : homes.priceNum >= (medPrice.oneBedMed * .80)? g++ : b++  
          }else if(homes.beds == 2)
          {
            homes.priceNum >= (medPrice.twoBedMed * 1.25)? r++ : homes.priceNum >= (medPrice.twoBedMed * 1.15)? y++ : 
            homes.priceNum >= (medPrice.twoBedMed * 1.05)? y++ : homes.priceNum >= (medPrice.twoBedMed * .80)? g++ : b++  
          }else if(homes.beds == 3)
          {
            homes.priceNum >= (medPrice.threeBedMed * 1.25)? r++ : homes.priceNum >= (medPrice.threeBedMed * 1.15)? y++ : 
            homes.priceNum >= (medPrice.threeBedMed * 1.05)? y++ : homes.priceNum >= (medPrice.threeBedMed * .80)? g++ : b++  
          }else if(homes.beds == 4)
          {
            homes.priceNum >= (medPrice.fourBedMed * 1.25)? r++ : homes.priceNum >= (medPrice.fourBedMed * 1.15)? y++ : 
            homes.priceNum >= (medPrice.fourBedMed * 1.05)? y++ : homes.priceNum >= (medPrice.fourBedMed * .80)? g++ : b++  
          }else if(homes.beds >= 5)
          {
            homes.priceNum >= (medPrice.fiveBedMed * 1.25)? r++ : homes.priceNum >= (medPrice.fiveBedMed * 1.15)? y++ : 
            homes.priceNum >= (medPrice.fiveBedMed * 1.05)? y++ : homes.priceNum >= (medPrice.fiveBedMed * .80)? g++ : b++ 
          }
        }
      )
      }


    //   if(r >= y && r >= o && r >= g && r >= b) 
    //  {
    //   let zipstring5 = idZips.toString()
    //   await this.props.updateZip({color:'red', zipcode: zipstring5})
    //  }
    // else if(y >= r && y >= o && y >= g && y >= b) 
    //  {
    //   let zipstring4 = idZips.toString()
    //    await this.props.updateZip({color: 'orange', zipcode: zipstring4})
    //  }else if(o >= y && o >= r && o >= g && o >= b) 
    //  {
    //   let zipstring3 = idZips.toString()
    //   await this.props.updateZip({color: 'yellow', zipcode: zipstring3})
    //  }else if(g >= y && g >= o && g >= r && g >= b) 
    //  {
    //   let zipstring2 = idZips.toString()
    //   await this.props.updateZip({color: 'green', zipcode: zipstring2})
    //  }else 
    //  {
    //   let zipstring1 = idZips.toString()
    //   console.log(zipstring1)
    //   await this.props.updateZip({color: 'blue', zipcode: zipstring1})
    //  }
    //  console.log(r, o, y, g, b)
    })
   
}