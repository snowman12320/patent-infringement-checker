// import React, { useEffect, useState } from 'react'
// import { List, ListItem, ListItemText } from '@mui/material'
// // ...現有代碼...
// const SideMenu: React.FC = () => {
//   const [savedResults, setSavedResults] = useState([])

//   useEffect(() => {
//     const results = JSON.parse(localStorage.getItem('analysisResults') || '[]')
//     setSavedResults(results)
//   }, [])

//   return (
//     // ...現有代碼...
//     <List>
//       {savedResults.map((result, index) => (
//         <ListItem button key={index}>
//           <ListItemText
//             primary={new Date(result.timestamp).toLocaleString('zh-TW')}
//             secondary={result.analysis.company_name}
//           />
//         </ListItem>
//       ))}
//     </List>
//     // ...現有代碼...
//   )
// }
// // ...現有代碼...
