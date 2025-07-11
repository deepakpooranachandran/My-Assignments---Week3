let intersection = (arr1, arr2) => {

  let result = []
  let k = 0

  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) {
        let duplicate = false

        // manual duplicate check
        for (let x = 0; x < k; x++) {
          if (result[x] === arr1[i]) {
            duplicate = true
            break
          }
        }

        if (duplicate === false) {
          result[k] = arr1[i]
          k++
        }
      }
    }
  }

  if (k > 0) {
    console.log(result)
  } else {
    console.log("No common numbers between given arrays")
  }
}

intersection([123, 245, 367, 489, 512], [245, 367, 489, 678, 890])
intersection([123, 245, 367, 489, 512], [100, 200, 300])
intersection([111, 222, 245], [245, 111])
