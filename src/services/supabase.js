
import { createClient } from '@supabase/supabase-js'


export const supabaseUrl = 'https://rekwtwnmjvdceiwkeqhl.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJla3d0d25tanZkY2Vpd2tlcWhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg0NDU4NDYsImV4cCI6MjAzNDAyMTg0Nn0.KerED69mCbzu_IbK14mFLBFiXkZfCGDTmX1v6WcUZIo"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase