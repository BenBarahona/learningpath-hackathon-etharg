

import { Box, Button, Text, VStack, Input, Textarea,  FormControl, FormLabel } from "@chakra-ui/react";

export const Step2 = ({ formData, setFormData, setStep, selectedChallenge}: any) => {
 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: name === 'balance' ? Number(value) : value,
      });
    };
  
    const handleSubmit = () => {
      console.log(formData, selectedChallenge);
      setStep(2)
      // Aquí puedes agregar la lógica para guardar en Firebase
    };
  
    return (
      <Box p={5} className="w-full mx-2 mx-auto bg-white rounded-lg shadow-md">
        <Text fontSize="2xl" mb={5} className="font-bold">Create New Challenge</Text>
        <VStack spacing={5} align="flex-start">
          <FormControl>
            <FormLabel className="font-semibold">Banner</FormLabel>
            <Button className="w-full" colorScheme="orange">Add Multimedia</Button>
          </FormControl>
          <FormControl>
            <FormLabel className="font-semibold">Title</FormLabel>
            <Input
              name="title"
              placeholder="Scroll Onboarding"
              value={formData.title}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel className="font-semibold">Description</FormLabel>
            <Textarea
              name="description"
              placeholder="Dive into Scroll Documentation and start building in this amazing ecosystem!"
              value={formData.description}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel className="font-semibold">Minimum Amount of Historic $PATH Balance to Play</FormLabel>
            <Input
              name="balance"
              type="number"
              placeholder="0 $PATH"
              value={formData.balance}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel className="font-semibold">Deadline</FormLabel>
            <Input
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleInputChange}
            />
          </FormControl>
          <Button className="w-full" colorScheme="orange" onClick={handleSubmit}>Continue</Button>
        </VStack>
      </Box>
    );
  };
  