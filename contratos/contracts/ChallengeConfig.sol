// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ChallengeConfig {
    struct Challenge {
        string question;
        string[] options;
        uint256 correctOptionIndex;
    }

    mapping(uint256 => Challenge) public challenges;
    uint256 public challengeCount;

    // Función para añadir un nuevo desafío
    function addChallenge(string memory _question, string[] memory _options, uint256 _correctOptionIndex) public {
        require(_correctOptionIndex < _options.length, "Invalid option index");

        Challenge storage challenge = challenges[challengeCount];
        challenge.question = _question;
        challenge.options = _options;
        challenge.correctOptionIndex = _correctOptionIndex;

        challengeCount++;
    }

    // Función para obtener los detalles de un desafío específico
    function getChallenge(uint256 _challengeId) public view returns (string memory, string[] memory, uint256) {
        Challenge storage challenge = challenges[_challengeId];
        return (challenge.question, challenge.options, challenge.correctOptionIndex);
    }
}
