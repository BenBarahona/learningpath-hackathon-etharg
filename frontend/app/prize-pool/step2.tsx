

import { Box, Button, Text, VStack, Input, Textarea,  FormControl, FormLabel } from "@chakra-ui/react";

export const Step2 = ({ formData, setFormData, submitChallenge, isWriting}: any) => {
 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: name === 'balance' ? Number(value) : value,
      });
    };
  
    return (
      <Box p={5} className="w-full mx-2 mx-auto bg-white rounded-lg shadow-md">
        <Text fontSize="2xl" mb={5} className="font-bold">Create New Prize</Text>
        <VStack spacing={5} align="flex-start">
          <FormControl>
            <FormLabel className="font-semibold">Banner</FormLabel>
            <Button className="w-full" colorScheme="orange">Add Multimedia</Button>
          </FormControl>
          <FormControl>
            <FormLabel className="font-semibold">Title</FormLabel>
            <Input
              name="title"
              placeholder="Enter title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel className="font-semibold">Description</FormLabel>
            <Textarea
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel className="font-semibold">Total Prize Pool</FormLabel>
            <Input
              name="totalPrizePool"
              type="number"
              placeholder="0 ETH"
              defaultValue={formData.totalPrizePool}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel className="font-semibold">$PATH Required to Burn</FormLabel>
            <Input
              name="PriceBurn"
              type="number"
              placeholder="0 ETH"
              defaultValue={formData.PriceBurn}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel className="font-semibold">Prize per User</FormLabel>
            <Input
              name="prizeUser"
              type="number"
              placeholder="0 ETH"
              defaultValue={formData.prizeUser}
              onChange={handleInputChange}
            />
          </FormControl>
          <Box>
            <Text>Total Reward: {formData.totalPrizePool} $PATH</Text>
            <Text>Prize per User: {formData.prizeUser} ETH</Text>
            <Text>Claims Available: {formData.totalPrizePool/formData.prizeUser} claims</Text>
          </Box>
          <FormControl>
            <FormLabel className="font-semibold">Deadline</FormLabel>
            <Input
              name="deadline"
              type="date"
              defaultValue={formData.deadline}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel className="font-semibold">Minimum XP Required to Claim</FormLabel>
            <Input
              name="minimumClaim"
              type="number"
              placeholder="0 ETH"
              defaultValue={formData.minimumClaim}
              onChange={handleInputChange}
            />
          </FormControl>
          <Button className="w-full" colorScheme="orange" isLoading={isWriting} onClick={submitChallenge}>Continue</Button>
        </VStack>
      </Box>
    );
  };
  