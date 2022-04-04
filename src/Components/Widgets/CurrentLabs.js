import React from 'react'

const CurrentLabs = () => {
  return (
    <div class="overflow-x-auto">
  <table class="table w-full">

    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Class</th>
      </tr>
    </thead>
    <tbody>

      <tr class="hover">
        <th>1</th>
        <td>Cicada 3301 Puzzle</td>
        <td>CSCI 458</td>
      </tr>

      <tr class="hover">
        <th>2</th>
        <td>Linux Terminal Basics</td>
        <td>CSCI 440</td>
      </tr>

      <tr class="hover">
        <th>3</th>
        <td>Machine Learning</td>
        <td>CSCI 101</td>
      </tr>
    </tbody>
  </table>
</div>
  )
}

export default CurrentLabs