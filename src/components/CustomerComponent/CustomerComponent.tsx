import {CustomerProps} from "./types"

function CustomerComponent(
{firstName,
  lastName,
  email,
  drivingLicense,
  bornDate,
}:CustomerProps
){
return(

    <div className="m-6 rounded-lg">
    <div className="flex flex-col w-auto ">
      <div className="bg-black text-white font-bold  rounded-tl-lg rounded-tr-lg p-3 ">
        Customer Data:
      </div>
      <div className="flex flex-col gap-3 w-auto p-3 bg-white  rounded-lg rounded-br-lg">
        <div className="flex gap-4">
          <div className="w-1/4 font-bold">Customer Name:</div>
          <div className="w-3/4">{firstName} {lastName}</div>
        </div>
        <div className="flex gap-4">
          <div className="w-1/4 font-bold">Email:</div>
          <div className="w-3/4">{email} </div>
        </div>
        <div className="flex gap-4">
          <div className="w-1/4 font-bold">Driving License:</div>
          <div className="w-3/4">
            {drivingLicense}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-1/4 font-bold">Born Date:</div>
          <div className="w-3/4">{bornDate}</div>
        </div>
        </div>
      </div>
    </div>
)

}
export default CustomerComponent