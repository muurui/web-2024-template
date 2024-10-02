import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import styled from "styled-components";
import {
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RestaurantIcon from "@mui/icons-material/Restaurant";

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string;
  servings: number;
}

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
  border-radius: 15px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
`;

const StyledButton = styled(Button)`
  && {
    margin-top: 1rem;
    background: linear-gradient(45deg, #2196F3 30%, #21CBF3 90%);
    border-radius: 3px;
    border: 0;
    color: white;
    height: 48px;
    padding: 0 30px;
    box-shadow: 0 3px 5px 2px rgba(33, 203, 243, .3);
  }
`;

const StyledListItem = styled(ListItem)`
  && {
    background-color: rgba(255, 255, 255, 0.8);
    margin-bottom: 10px;
    border-radius: 5px;
  }
`;

const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 1rem;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 5px;
  }
`;

function App() {
  const [recipes, setRecipes] = useLocalStorageState<Recipe[]>("recipes", {
    defaultValue: [],
  });
  const [newRecipe, setNewRecipe] = useState<Recipe>({
    id: 0,
    name: "",
    ingredients: [],
    instructions: "",
    servings: 1,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [servingsMultiplier, setServingsMultiplier] = useState(1);

  useEffect(() => {
    if (recipes.length === 0) {
      const boilerplateRecipes: Recipe[] = [
        {
          id: 1,
          name: "Spaghetti Carbonara",
          ingredients: ["400g spaghetti", "200g pancetta", "4 eggs", "100g Pecorino cheese", "Black pepper"],
          instructions: "Cook pasta. Fry pancetta. Mix eggs and cheese. Combine all ingredients.",
          servings: 4,
        },
        {
          id: 2,
          name: "Chicken Stir Fry",
          ingredients: ["500g chicken breast", "Mixed vegetables", "Soy sauce", "Ginger", "Garlic"],
          instructions: "Cut chicken. Stir fry vegetables. Add chicken and sauce. Cook until done.",
          servings: 3,
        },
        {
          id: 3,
          name: "Greek Salad",
          ingredients: ["Tomatoes", "Cucumber", "Red onion", "Feta cheese", "Olives", "Olive oil"],
          instructions: "Chop vegetables. Add cheese and olives. Drizzle with olive oil and mix.",
          servings: 2,
        },
        {
          id: 4,
          name: "Banana Smoothie",
          ingredients: ["2 bananas", "300ml milk", "2 tbsp honey", "1 cup ice"],
          instructions: "Blend all ingredients until smooth.",
          servings: 2,
        },
        {
          id: 5,
          name: "Guacamole",
          ingredients: ["2 avocados", "1 tomato", "1 onion", "Cilantro", "Lime juice", "Salt"],
          instructions: "Mash avocados. Chop vegetables. Mix all ingredients. Season to taste.",
          servings: 4,
        },
      ];
      setRecipes(boilerplateRecipes);
    }
  }, [recipes, setRecipes]);

  const handleAddRecipe = () => {
    if (newRecipe.name.trim() !== "") {
      setRecipes([...recipes, { ...newRecipe, id: Date.now() }]);
      setNewRecipe({
        id: 0,
        name: "",
        ingredients: [],
        instructions: "",
        servings: 1,
      });
    }
  };

  const handleDeleteRecipe = (id: number) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  const handleEditRecipe = (id: number) => {
    setEditingId(id);
    const recipeToEdit = recipes.find((recipe) => recipe.id === id);
    if (recipeToEdit) {
      setNewRecipe(recipeToEdit);
      setOpenDialog(true);
    }
  };

  const handleUpdateRecipe = () => {
    if (newRecipe.name.trim() !== "") {
      setRecipes(
        recipes.map((recipe) =>
          recipe.id === editingId ? newRecipe : recipe
        )
      );
    }
    setEditingId(null);
    setNewRecipe({
      id: 0,
      name: "",
      ingredients: [],
      instructions: "",
      servings: 1,
    });
    setOpenDialog(false);
  };

  const handleRecalculateServings = (recipe: Recipe) => {
    const newIngredients = recipe.ingredients.map((ingredient) => {
      const [amount, ...rest] = ingredient.split(' ');
      const newAmount = parseFloat(amount) * servingsMultiplier;
      return `${newAmount} ${rest.join(' ')}`;
    });

    return {
      ...recipe,
      ingredients: newIngredients,
      servings: recipe.servings * servingsMultiplier,
    };
  };

  return (
    <AppContainer>
      <Typography variant="h4" component="h1" gutterBottom style={{ color: "white" }}>
        Recipe Manager
      </Typography>
      <StyledTextField
        fullWidth
        variant="outlined"
        label="Recipe Name"
        value={newRecipe.name}
        onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
      />
      <StyledButton
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleAddRecipe}
        startIcon={<RestaurantIcon />}
      >
        Add Recipe
      </StyledButton>
      <List>
        {recipes.map((recipe) => (
          <StyledListItem key={recipe.id}>
            <ListItemText
              primary={recipe.name}
              secondary={`Servings: ${recipe.servings}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEditRecipe(recipe.id)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteRecipe(recipe.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </StyledListItem>
        ))}
      </List>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Recipe</DialogTitle>
        <DialogContent>
          <StyledTextField
            fullWidth
            label="Recipe Name"
            value={newRecipe.name}
            onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
          />
          <StyledTextField
            fullWidth
            label="Ingredients (comma-separated)"
            value={newRecipe.ingredients.join(", ")}
            onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value.split(", ") })}
          />
          <StyledTextField
            fullWidth
            label="Instructions"
            multiline
            rows={4}
            value={newRecipe.instructions}
            onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
          />
          <StyledTextField
            fullWidth
            label="Servings"
            type="number"
            value={newRecipe.servings}
            onChange={(e) => setNewRecipe({ ...newRecipe, servings: parseInt(e.target.value) })}
          />
          <StyledTextField
            fullWidth
            label="Servings Multiplier"
            type="number"
            value={servingsMultiplier}
            onChange={(e) => setServingsMultiplier(parseFloat(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateRecipe}>Save</Button>
          <Button onClick={() => setNewRecipe(handleRecalculateServings(newRecipe))}>
            Recalculate Servings
          </Button>
        </DialogActions>
      </Dialog>
    </AppContainer>
  );
}

export default App;