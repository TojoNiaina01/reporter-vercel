import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/24/solid";
import { ROOT_URL } from "@/env";
import localStorage from "localStorage";
import {v4 as uuidv4} from "uuid"

const ReviewWithStars = ({rate, articleID}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const storageLang = JSON.parse(localStorage.getItem('token')).lang
  const storageRating = JSON.parse(localStorage.getItem('token')).rating

  useEffect(() => {
    if(rate){
      setRating(rate)
      setIsOpen(true)
    }
    
  }, [rate])

  const handleRatingChange = (value) => {

    if(!rate){

        const param = {query: 'incrementRating', param: [articleID]}
            fetch(`${ROOT_URL}/api/knexApi`, {
              method: "POST",
              body: JSON.stringify(param),
              headers: {
                "Content-type" : "application/json"
              }
            }).then((res) => res.json())
              .then((data) => {
                const rateVal = {
                  id: articleID,
                  rate: value
                }

                storageRating.push(rateVal)
                localStorage.setItem('token', JSON.stringify({lang: storageLang, rating: storageRating}))

                setRating(value);
                setIsOpen(true);
              })
      
    }
   
    console.log(value)
  };

  return (
    <div className="flex items-center">
      {/* Étoiles */}
      <div className="font-semibold text-lg mr-4">votre avis :</div>
      <div className="flex space-x-1">
        {[...Array(5)].map((_, index) => (
          <StarIcon
            key={uuidv4()}
            className={`h-10 w-10 ${
              rating >= index + 1 ? "text-yellow-400" : "text-gray-300"
            } cursor-pointer transition-colors duration-200`}
            onClick={() => handleRatingChange(index + 1)}
          />
        ))}
      </div>

      {/* Message de confirmation */}
      <Transition
        show={isOpen}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="ml-2 text-lg text-gray-600">
          Merci pour votre évaluation !
        </div>
      </Transition>
    </div>
  );
};

export default ReviewWithStars;
