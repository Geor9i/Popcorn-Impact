function popImpact (volumeFreshPop,holdTime,overPortion,theoreticalUsage) {
    
    // CONVERT VALUES 

    holdTime *= 60 // To Seconds
    overPortion /= 100 // to Decimal
    theoreticalUsage *= 1000 // To grams
    let flag = ["Small", "Regular", "Large"]
    let smallCount = 10
    let regularCount = 21
    let largeCount = 34
    let frozenPop = volumeFreshPop * 1.25
    let popWeight = 6.7567567568;
    let priceBoxPopcorn = 68.94; //£  for 14 bags // 148 piece in each
    let priceBagPopcorn = 4.924285714285714; //£
    let popPrice = 0.0332722007722008; //£
    let totalPieces = theoreticalUsage / popWeight
    let InitialPrice = totalPieces * popPrice
    let smallBoxesShare = totalPieces * 0.3403;
    let regularBoxesShare = totalPieces * 0.12;
    let largeBoxesShare = totalPieces * 0.539574;
    let currVol = (volumeFreshPop -  volumeFreshPop * ((0.0104166666666667 * holdTime) / 100))
    
    let smallSold = smallBoxesShare / smallCount
    let smallCost = smallBoxesShare * popPrice
    let smallBoxVolume = frozenPop * smallCount
    let smallBoxCookedVolume = volumeFreshPop * smallCount

    let regularSold = regularBoxesShare / regularCount
    let regularCost = regularBoxesShare * popPrice
    let regularBoxVolume = frozenPop * regularCount
    let regularBoxCookedVolume = volumeFreshPop * regularCount

    let largeSold = largeBoxesShare / largeCount
    let largeCost = largeBoxesShare * popPrice
    let largeBoxVolume = frozenPop * largeCount
    let largeBoxCookedVolume = volumeFreshPop * largeCount

    let prep = (volumeFreshPop, holdTime, overPortion, totalBoxVolume, cookVolume, type,) => {
        volumeFreshPop = volumeFreshPop -  volumeFreshPop * ((0.0104166666666667 * holdTime) / 100)
        let currentBoxCount = (cookVolume / volumeFreshPop) 
        overPortion = (cookVolume * (overPortion / 100)) + 1
        if ((currentBoxCount * overPortion) * volumeFreshPop <= totalBoxVolume){
            currentBoxCount *= overPortion
            let currentBoxVolume =  currentBoxCount
            return currentBoxVolume 
        } else {
            let currentBoxVolume = totalBoxVolume / volumeFreshPop
            console.log(`Box Limit Reached !\n${type} popcorn count: ${Math.round(currentBoxVolume)}\n`);
            return currentBoxVolume
        } 
    }

    //--------------------------------------------------------------------------
    //                    C O U N T E R S 


    let smallCurrCount = prep(volumeFreshPop, holdTime, overPortion, smallBoxVolume, smallBoxCookedVolume, flag[0])
    let smallDeviation = Math.round(Math.abs(smallCurrCount - smallCount))

    let regularCurrCount = prep(volumeFreshPop, holdTime, overPortion, regularBoxVolume, regularBoxCookedVolume, flag[1])
    let regularDeviation = Math.round(Math.abs(regularCurrCount - regularCount))

    let largeCurrCount = prep(volumeFreshPop, holdTime, overPortion, largeBoxVolume, largeBoxCookedVolume, flag[2])
    let largeDeviation = Math.round(Math.abs(largeCurrCount - largeCount))
    
    let totalExtraPieces = (smallSold * smallDeviation) + (regularSold * regularDeviation) + (largeSold * largeDeviation)

    //---------------------------------------
                //REPORT SHEET\\

//*

    console.log(`Excess Pieces: ${Math.round(totalExtraPieces)}`);
    console.log("\n" + (" ").repeat(31) + "Usage in KG" + (" ").repeat(30));
    console.log((" ").repeat(29) + ("=").repeat(14) + (" ").repeat(20) + "\n");
    console.log((" ").repeat(2) + "Theoretical:" + (" ").repeat(52) +  "Actual:");
    console.log((" ").repeat(1) + ("-").repeat(14) + (" ").repeat(49) +  ("-").repeat(10));
    console.log((" ").repeat(3) + `${(theoreticalUsage / 1000).toFixed(2)} kg` + (" ").repeat(54) + `${(((totalExtraPieces * popWeight) / 1000) + theoreticalUsage / 1000).toFixed(2)} kg`);
    console.log((" ").repeat(32) + " Cost £" + (" ").repeat(30));
    console.log((" ").repeat(32) + ("=").repeat(8) + (" ").repeat(30));
    console.log((" ").repeat(2) + "Theoretical:" + (" ").repeat(17) +  "Calculated:" + (" ").repeat(20) + "Usage Dependent:");
    console.log((" ").repeat(1) + ("-").repeat(14) + (" ").repeat(14) +  ("-").repeat(14) + (" ").repeat(17) + ("-").repeat(19));
    console.log((" ").repeat(5) + `£${InitialPrice.toFixed(2)}` + (" ").repeat(22) +  `£${(InitialPrice + (totalExtraPieces * popPrice)).toFixed(2)}` + (" ").repeat(28) + `£${(totalExtraPieces * popPrice).toFixed(2)}` + "\n");
    console.log((" ").repeat(27) + "Portion Size Shares:" + (" ").repeat(30));
    console.log((" ").repeat(25) + ("=").repeat(24) + (" ").repeat(30));
    console.log((" ").repeat(2) + "By Size:" + (" ").repeat(15) +  "Theoretical Cost + Usage:" + (" ").repeat(13) + "Piece deviation:");
    console.log((" ").repeat(1) + ("-").repeat(10) + (" ").repeat(12) +  ("-").repeat(29) + (" ").repeat(9) + ("-").repeat(19) + "\n");
    console.log((" ").repeat(2) + "Small:" + `   ${Math.round(smallSold)}` + (" ").repeat(16) +  `£${smallCost.toFixed(2)} + £${(smallDeviation * popPrice).toFixed(2)}` + (" ").repeat(21) + `Small:   ${smallDeviation}`);
    console.log((" ").repeat(2) + "Regular:" + ` ${Math.round(regularSold)}` + (" ").repeat(17) +  `£${regularCost.toFixed(2)} + £${(regularDeviation * popPrice).toFixed(2)}` + (" ").repeat(22) + `Regular: ${regularDeviation}`);
    console.log((" ").repeat(2) + "Large:" + `   ${Math.round(largeSold)}` + (" ").repeat(16) +  `£${largeCost.toFixed(2)} + £${(largeDeviation * popPrice).toFixed(2)}` + (" ").repeat(21) + `Large:   ${largeDeviation}`);
    console.log((" ").repeat(1) + ("-").repeat(14) + (" ").repeat(12) + ("-").repeat(8) +  ("-").repeat(10) + (" ").repeat(16) +  ("-").repeat(16));
    console.log((" ").repeat(27) + "Popcorn State Chart:" + (" ").repeat(30));
    console.log((" ").repeat(25) + ("=").repeat(23) + (" ").repeat(30));
    console.log((" ").repeat(24) + "Avg. Piece Volume Tracker:" + (" ").repeat(30) + "\n");
    console.log((" ").repeat(2) + "Frozen:" + (" ").repeat(24) +  "Cooked:" + (" ").repeat(21) + `Held for ${holdTime / 60} minutes:`);
    console.log((" ").repeat(2) + ("-").repeat(8) + (" ").repeat(22) +  ("-").repeat(9) + (" ").repeat(18) + ("-").repeat(24));
    console.log((" ").repeat(3) + `${frozenPop.toFixed(2)} cm3` + (" ").repeat(20) +  `${volumeFreshPop.toFixed(2)} cm3` + (" ").repeat(27) + `${currVol.toFixed(2)} cm3`);
    console.log((" ").repeat(23) + "Volume Reduction Per Piece:" + (" ").repeat(30));
    console.log((" ").repeat(32) + `${(((volumeFreshPop - currVol) / volumeFreshPop)*100).toFixed(2)}%` + (" ").repeat(30));
//*/
}

popImpact(
8.9, // Popcorn piece volume in cm3
15, //  Overhold time in minutes
0,  // Over-portioning as percentage
15.57 // Theoretical Usage in KG
)
