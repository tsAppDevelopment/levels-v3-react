export const CardShadow = ({child, style}:{child:JSX.Element, style?:any}) => {
  return <div style={{
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    backgroundColor: 'white',
    ...style
  }}>
    {child}
  </div>
}