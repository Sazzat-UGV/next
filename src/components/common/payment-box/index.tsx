import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { CreditCard } from "lucide-react"
import visa from "@/assets/static/payment/visa.png"
import mistercard from "@/assets/static/payment/mistercard.png"
import { useSuccessDialog } from "@/context/success-modal"

export default function PaymentBox({ setIsPayment }: any) {
  const { success } = useSuccessDialog();
  const hanldeSuccess = async () => {
    const tt = await success()
    
  }
  return (
    <div>
      <div className="space-y-6">
        {/* Required amount section */}
        <div className="text-center space-y-1">
          <p className="text-grays">Required amount</p>
          <h2 className="text-3xl font-bold text-blacks">$99.99</h2>
        </div>

        {/* Card information section */}
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Card information</h3>
          <div className="space-y-0 border rounded-md">
            <div className="relative">
              <Label htmlFor="card-number" className="sr-only">
                Card number
              </Label>
              <Input id="card-number" placeholder="Card number" className="pr-20 border-b rounded-none border-t-0 border-x-0" />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Image
                  src={visa}
                  alt="Visa logo"
                  width={50}
                  height={40}
                  className="h-9 w-auto mr-1"
                />
                <Image
                  src={mistercard}
                  alt="Mastercard logo"
                  width={50}
                  height={40}
                  className="h-8 w-auto"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mm-yy" className="sr-only">
                  MM/YY
                </Label>
                <Input id="mm-yy" placeholder="MM/YY" className="border-y-0 border-l-0 rounded-none border-r" />
              </div>
              <div className="relative">
                <Label htmlFor="cvc" className="sr-only">
                  CVC
                </Label>
                <Input id="cvc" placeholder="CVC" className="pr-10 border-none" />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <CreditCard className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Billing address section */}
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Billing address</h3>
          <div className="space-y-0 border rounded-md">
            <div>
              <Label htmlFor="country" className="sr-only">
                Country
              </Label>
              <Select defaultValue="US">
                <SelectTrigger id="country" className="w-full rounded-none border-x-0 border-t-0 cursor-pointer shadow-none">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="rounded-none p-0">
                  <SelectItem value="US" className="border-b pl-4 rounded-none">United States</SelectItem>
                  <SelectItem value="CA" className="border-b pl-4 rounded-none">Canada</SelectItem>
                  <SelectItem value="GB" className="pl-4 rounded-none">United Kingdom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="zip" className="sr-only">
                ZIP
              </Label>
              <Input id="zip" placeholder="ZIP" className="border-none" />
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Button variant="outline" className="bg-transparent hover:bg-transparent w-full">
            Cancel
          </Button>
          <Button onClick={() => {
            setIsPayment(false)
            hanldeSuccess()
            }} variant={"primary"} className="w-full">Pay now</Button>
        </div>
      </div>
    </div>
  )
}
