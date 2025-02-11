import RequiredField from '@/app/components/RequiredField'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Title } from '@/components/ui/title'
import { Label } from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'

export default function RolAdd() {
  return (
    <>
        <Title>Agregar rol</Title>

        <form>
            <Card>
              <CardHeader>
                  <CardDescription>Agregar un nuevo rol</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label>
                          Nombre 
                          <RequiredField/>
                        </Label>
                        <Input type="text" placeholder="Rol" />
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <Label>
                          Descripción 
                          <RequiredField/>
                        </Label>
                        <Textarea placeholder="Escribe una descripcion del rol" />
                      </div>
                  </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                  <Button asChild variant="outline">
                    <Link href='/administration/roles'>Cancelar</Link>
                  </Button>
                  <Button>Guardar</Button>
              </CardFooter>
            </Card>
        </form>
      </>
  )
}
